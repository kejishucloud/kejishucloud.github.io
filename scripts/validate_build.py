#!/usr/bin/env python3
"""静态生成结果检查：真实路由、文章、HTML 语言及 SEO。"""

from __future__ import annotations
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree
from urllib.parse import urlsplit, unquote

LANGS = {"zh": "", "en": "en/", "es": "es/", "ja": "ja/"}
PAGES = ("", "insights/", "frontier/", "ai-work/", "agents/",
         "tools/", "projects/", "lab/", "about/", "search/", "privacy/")


class PageInspector(HTMLParser):
    """提取构建后页面的 SEO 结构。"""

    def __init__(self) -> None:
        """初始化。:return: None。"""
        super().__init__()
        self.canonical: list[str] = []
        self.hreflangs: list[str] = []
        self.headings = 0
        self.lang = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        """读取结构化标记。

        :param tag: HTML 标签
        :param attrs: 标签属性
        :return: None
        """
        data = dict(attrs)
        if tag == "html":
            self.lang = data.get("lang") or ""
        if tag == "h1":
            self.headings += 1
        if tag == "link" and data.get("rel") == "canonical":
            self.canonical.append(data.get("href") or "")
        if tag == "link" and data.get("hreflang"):
            self.hreflangs.append(data["hreflang"] or "")


def validate(root: Path) -> list[str]:
    """校验每个核心页面以及文章。

    :param root: Astro 项目目录
    :return: 所有阻断错误
    """
    dist = root / "dist"
    errors: list[str] = []
    for lang, prefix in LANGS.items():
        for page in PAGES:
            relative = prefix + page
            path = dist / relative / "index.html"
            url = "/" + relative
            if not path.is_file():
                errors.append("Missing core route " + url)
                continue
            inspector = PageInspector()
            inspector.feed(path.read_text(encoding="utf-8"))
            if inspector.lang != ("zh-CN" if lang == "zh" else lang):
                errors.append("Wrong html lang " + url)
            if inspector.headings != 1:
                errors.append(f"Expected one h1 in {url}: {inspector.headings}")
            if inspector.canonical != ["https://kejishucloud.github.io" + url]:
                errors.append(f"Wrong canonical: {url}")
            if len(inspector.hreflangs) != 5:
                errors.append(f"Wrong alternates: {url}")
    # Every source-backed tool profile and comparison route must exist in all locales.
    tool_slugs = ("notebooklm", "langgraph", "hugging-face-evaluate", "n8n", "compare")
    for lang, prefix in LANGS.items():
        for slug in tool_slugs:
            url = "/" + prefix + "tools/" + slug + "/"
            tool_file = dist / prefix / "tools" / slug / "index.html"
            if not tool_file.exists():
                errors.append("Missing tool route " + url)
                continue
            tool_parser = PageInspector()
            tool_parser.feed(tool_file.read_text(encoding="utf-8"))
            if tool_parser.lang != ("zh-CN" if lang == "zh" else lang):
                errors.append("Wrong tool locale " + url)
            if tool_parser.headings != 1:
                errors.append(f"Tool route requires one h1: {url}")
            if tool_parser.canonical != ["https://kejishucloud.github.io" + url]:
                errors.append("Wrong tool canonical " + url)
            if len(tool_parser.hreflangs) != 5:
                errors.append("Missing tool hreflang alternatives " + url)
    index = dist / "search-index.json"
    if not index.is_file():
        errors.append("Missing search index")
        return errors
    articles = json.loads(index.read_text(encoding="utf-8"))
    if len(articles) != 8:
        errors.append(f"Expected 8 approved articles, got {len(articles)}")
    for article in articles:
        path = dist / article["url"].strip("/") / "index.html"
        if not path.exists():
            errors.append("Missing approved article " + article["url"])
        else:
            inspector = PageInspector()
            inspector.feed(path.read_text(encoding="utf-8"))
            if len(inspector.hreflangs) < 2:
                errors.append("Missing article alternates " + article["url"])
    # Inspect the actual generated HTML links and assets in every language.
    class LinkInspector(HTMLParser):
        """Collect site-local href/src destinations without following external URLs."""

        def __init__(self) -> None:
            """Initialize the per-page URL collector. :return: None."""
            super().__init__()
            self.links: list[str] = []

        def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
            """Record internal URLs only.

            :param tag: HTML element type
            :param attrs: Element attributes
            :return: None
            """
            data = dict(attrs)
            key = "href" if tag in {"a", "link"} else "src"
            url = data.get(key)
            if url and url.startswith("/") and not url.startswith("//"):
                self.links.append(url)

    checked_links: set[tuple[str, str]] = set()
    for html in dist.rglob("*.html"):
        inspector = LinkInspector()
        inspector.feed(html.read_text(encoding="utf-8"))
        for link in inspector.links:
            route = unquote(urlsplit(link).path)
            if not route:
                continue
            target = dist / route.lstrip("/")
            if route.endswith("/") or not target.suffix:
                target = target / "index.html"
            marker = (html.relative_to(dist).as_posix(), route)
            if not target.is_file() and marker not in checked_links:
                errors.append(f"Broken local URL {marker[0]} -> {marker[1]}")
            checked_links.add(marker)
    # Hero must never rely on WebGPU: verify the self-contained vector fallback.
    core = dist / "media" / "signal-core.svg"
    if not core.exists():
        errors.append("Missing no-GPU signal-core.svg")
    else:
        try:
            ElementTree.parse(core)
        except ElementTree.ParseError:
            errors.append("Invalid static signal-core.svg")
    og = dist / "media" / "og.png"
    if not og.is_file() or og.stat().st_size < 40000:
        errors.append("Missing or incomplete social preview")
    for name in ("articles.xml", "sitemap-index.xml", "pagefind/pagefind.js", "404.html"):
        if not (dist / name).is_file():
            errors.append("Missing asset " + name)
    return errors


if __name__ == "__main__":
    issues = validate(Path(__file__).resolve().parents[1])
    for issue in issues:
        print("ERROR:", issue)
    print(f"Build audit {'PASS' if not issues else 'FAIL'} ({len(issues)} issues)")
    sys.exit(bool(issues))
