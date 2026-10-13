#!/usr/bin/env python3
"""
检查 Jekyll 构建产物的真实页面和语言链接。

仅使用 Python 标准库；应在 actions/jekyll-build-pages 执行后调用。
:return: 所有核心路径、内容和 SEO 语言链接正确时返回 0
"""
from __future__ import annotations

import sys
from pathlib import Path


class BuiltSiteValidator:
    """对生成的静态 HTML 执行最小但具有约束力的发布检查。"""

    LANG_CODES = {"zh": "zh-CN", "en": "en", "es": "es", "ja": "ja"}
    TOPICS = ("frontier", "ai-work", "agents", "tools")
    REDIRECTS = ("news", "aigc", "algorithm", "summarize", "blog", "book")

    def __init__(self, site: Path) -> None:
        """
        构造检查器。
        :param site: Jekyll 输出根目录，通常为仓库内 _site
        :return: None
        """
        self.site = site
        self.errors: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        """
        保存断言失败的信息，继续验证其他页面。
        :param condition: 是否满足预期
        :param message: 不满足预期时的说明
        :return: None
        """
        if not condition:
            self.errors.append(message)

    def check_page(self, route: str, lang: str, view: str) -> None:
        """
        检查指定路由渲染出的核心元素。
        :param route: 根路径下带前后斜线的网站路由
        :param lang: 语言标识
        :param view: home、topic 或 about
        :return: None
        """
        target = self.site / route.lstrip("/") / "index.html"
        self.check(target.exists(), f"{route}: missing generated index.html")
        if not target.exists():
            return

        html = target.read_text(encoding="utf-8")
        self.check(f'<html lang="{self.LANG_CODES[lang]}"' in html,
                   f"{route}: incorrect HTML language")
        self.check('rel="canonical"' in html, f"{route}: no canonical link")
        self.check("{{" not in html and "{%" not in html, f"{route}: unrendered Liquid detected")
        self.check('id="main"' in html, f"{route}: no main landmark")
        self.check("KEJISHU" in html, f"{route}: branding missing")
        for expected in self.LANG_CODES.values():
            self.check(f'hreflang="{expected}"' in html,
                       f"{route}: alternate {expected} missing")
        if view == "home":
            self.check(html.count('class="topic-card ') == 4,
                       f"{route}: expected four topical entries")
        elif view == "topic":
            self.check(html.count('class="guide-row"') >= 3,
                       f"{route}: expected at least three rendered guide articles")
        elif view == "about":
            self.check('class="about-notes"' in html,
                       f"{route}: editorial policy content absent")

    def run(self) -> int:
        """
        验证全部页面与原栏目重定向。
        :return: 成功为 0，失败为 1
        """
        for lang in self.LANG_CODES:
            prefix = "/" if lang == "zh" else f"/{lang}/"
            self.check_page(prefix, lang, "home")
            self.check_page(f"{prefix}about/", lang, "about")
            for topic in self.TOPICS:
                self.check_page(f"{prefix}{topic}/", lang, "topic")
        for slug in self.REDIRECTS:
            self.check((self.site / slug / "index.html").exists(),
                       f"Missing old-route redirect: /{slug}/")
        if self.errors:
            for error in self.errors:
                print(f"FAIL: {error}", file=sys.stderr)
            print(f"{len(self.errors)} build output problem(s)", file=sys.stderr)
            return 1
        print("PASS: 24 rendered core pages, four-language metadata and six redirects.")
        return 0


if __name__ == "__main__":
    sys.exit(BuiltSiteValidator(Path(__file__).resolve().parents[1] / "_site").run())
