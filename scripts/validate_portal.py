#!/usr/bin/env python3
"""
KeJiShuCloud 多语言门户静态校验。

对页面矩阵、内容数据、引用来源和基础资源进行确定性检查。
不依赖第三方 Python 包，可直接作为 GitHub Actions 的检查步骤。

:return: 校验成功返回进程退出码 0，失败返回 1。
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.parse import urlparse


class PortalValidator:
    """验证多语言 Jekyll 页面和内容字典的一致性。"""

    LANGS: tuple[str, ...] = ("zh", "en", "es", "ja")
    TOPICS: tuple[str, ...] = ("frontier", "ai-work", "agents", "tools")

    def __init__(self, root: Path) -> None:
        """
        初始化项目检查器。
        :param root: Git 仓库根目录
        :return: None
        """
        self.root = root
        self.errors: list[str] = []
        self.data: dict = {}

    def expect(self, condition: bool, description: str) -> None:
        """
        登记校验结论。
        :param condition: 是否通过当前检查
        :param description: 失败时的错误说明
        :return: None
        """
        if not condition:
            self.errors.append(description)

    def read_data(self) -> None:
        """加载编辑数据文件，遇到解析错误时记录失败原因。"""
        try:
            self.data = json.loads((self.root / "_data/portal.json").read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            self.errors.append(f"portal.json is unavailable or invalid: {exc}")

    def verify_structure(self) -> None:
        """验证语言、栏目、来源以及本地化文案结构。"""
        if not self.data:
            return
        self.expect(tuple(self.data.get("order", [])) == self.TOPICS, "Topic order differs from the contract.")
        self.expect(tuple(locale[0] for locale in self.data.get("locales", [])) == self.LANGS, "Language list is incomplete.")
        for lang in self.LANGS:
            locale_copy = self.data.get("copy", {}).get(lang, {})
            self.expect(bool(locale_copy.get("hero")), f"{lang}: missing localized hero.")
            self.expect(bool(locale_copy.get("lead")), f"{lang}: missing localized introduction.")
            for topic in self.TOPICS:
                localized_topic = self.data.get("topics", {}).get(topic, {}).get(lang, [])
                self.expect(len(localized_topic) == 2, f"{lang}/{topic}: title or summary missing.")
                rows = locale_copy.get("guides", {}).get(topic, [])
                self.expect(len(rows) >= 3, f"{lang}/{topic}: expected at least 3 source-backed guides.")
                for index, row in enumerate(rows, start=1):
                    self.expect(len(row) == 5 and all(isinstance(v, str) and v.strip() for v in row),
                                f"{lang}/{topic} guide #{index}: invalid fields.")
                    if len(row) >= 5:
                        parsed = urlparse(row[4])
                        self.expect(parsed.scheme == "https" and bool(parsed.netloc),
                                    f"{lang}/{topic} guide #{index}: source must use HTTPS.")

    def verify_routes(self) -> None:
        """校验所有 24 个核心路由均有正确的 Front Matter。"""
        for lang in self.LANGS:
            base = "" if lang == "zh" else f"{lang}/"
            paths: dict[str, tuple[str, str]] = {
                "_pages/about.md" if lang == "zh" else f"{lang}/index.md":
                    ("home", f"/{base}"),
                "_pages/portal-about.md" if lang == "zh" else f"{lang}/about.md":
                    ("about", f"/{base}about/"),
            }
            for topic in self.TOPICS:
                path = f"_pages/portal-{topic}.md" if lang == "zh" else f"{lang}/{topic}.md"
                paths[path] = ("topic", f"/{base}{topic}/")
            for relative_path, (view, permalink) in paths.items():
                page_path = self.root / relative_path
                self.expect(page_path.exists(), f"Missing page: {relative_path}")
                if not page_path.exists():
                    continue
                source = page_path.read_text(encoding="utf-8")
                self.expect(source.startswith("---\n") and "\n---\n" in source[4:],
                            f"{relative_path}: invalid front matter.")
                for expected in ("layout: portal", f"lang: {lang}", f"view: {view}", f"permalink: {permalink}"):
                    self.expect(expected in source, f"{relative_path}: missing {expected!r}")

    def verify_assets(self) -> None:
        """检查渲染模板、可访问性与可选 Shader 集成。"""
        paths = (
            "_layouts/portal.html",
            "assets/css/portal.css",
            "assets/js/portal.js",
            "PRODUCT.md",
            "DESIGN.md",
            "docs/ROADMAP.md",
            "docs/EDITORIAL.md",
        )
        for path in paths:
            self.expect((self.root / path).exists(), f"Missing infrastructure file: {path}")
        layout = self.root / "_layouts/portal.html"
        if layout.exists():
            html = layout.read_text(encoding="utf-8")
            for marker in ("hreflang=", 'rel="canonical"', 'id="main"', "skip-link", "site.data.portal"):
                self.expect(marker in html, f"Layout missing {marker}")
        css = self.root / "assets/css/portal.css"
        if css.exists():
            stylesheet = css.read_text(encoding="utf-8")
            self.expect("prefers-reduced-motion" in stylesheet, "Reduced-motion fallback is missing.")
            self.expect("html:not(.js)" in stylesheet, "No-JS mobile navigation fallback is missing.")
        js = self.root / "assets/js/portal.js"
        if js.exists():
            script = js.read_text(encoding="utf-8")
            self.expect("createShader" in script and "LinearGradient" in script, "Shaders JS integration missing.")

    def run(self) -> int:
        """
        执行完整静态检查。
        :return: 0 表示通过，1 表示至少一个检查失败
        """
        self.read_data()
        self.verify_structure()
        self.verify_routes()
        self.verify_assets()
        if self.errors:
            for item in self.errors:
                print(f"ERROR: {item}", file=sys.stderr)
            print(f"Failed: {len(self.errors)} issue(s).", file=sys.stderr)
            return 1
        print("PASS: 24 localized pages, 48 source-backed guides and portal assets validated.")
        return 0


if __name__ == "__main__":
    sys.exit(PortalValidator(Path(__file__).resolve().parents[1]).run())
