"""KeJiShuCloud 3.0 内容治理：只审计与生成待审草稿，不自动发布。"""

from __future__ import annotations

import json
import logging
import re
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

LOG = logging.getLogger(__name__)
LANGUAGES = frozenset({"zh", "en", "es", "ja"})
TOPICS = frozenset({"frontier", "ai-work", "agents", "tools"})


@dataclass(frozen=True, slots=True)
class ArticleRecord:
    """保存文章审核所需的不可变字段。

    :param path: Markdown 路径
    :param values: Frontmatter 标量字段
    :param sources: 外部来源 URL
    """
    path: Path
    values: dict[str, str]
    sources: tuple[str, ...]


@dataclass(slots=True)
class AuditReport:
    """储存审计结果及错误、警告数量。"""
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    count: int = 0

    @property
    def passed(self) -> bool:
        """返回是否通过。:return: 无阻断错误时为真。"""
        return not self.errors

    def to_dict(self) -> dict[str, object]:
        """转换为 JSON 对象。:return: 字典。"""
        return dict(passed=self.passed, count=self.count, errors=self.errors, warnings=self.warnings)


class ContentNormalizer:
    """对新草稿进行可重复规范化，禁止触碰正式内容。"""

    @staticmethod
    def slug(value: str) -> str:
        """将英文标题转换为安全 slug。

        :param value: 标题或 slug
        :return: 小写字母、数字和连字符构成的 slug
        :raises ValueError: 缺少有效字符
        """
        result = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
        if not result:
            raise ValueError("empty slug")
        return result

    @staticmethod
    def text(value: str) -> str:
        """规范换行与末尾空白。

        :param value: 原稿
        :return: 保留内容的规范化文本
        """
        return value.replace("\r\n", "\n").replace("\r", "\n").rstrip() + "\n"


class SourceCollector:
    """从已有 frontmatter 提取来源，不对外自动抓取。"""
    RE = re.compile(r"^\s*(?:-\s*)?url:\s*['\"]?(https?://[^\s'\"#]+)", re.MULTILINE)

    def collect(self, markdown: str) -> tuple[str, ...]:
        """提取并去重 URL。

        :param markdown: 原始 Markdown
        :return: 按顺序排列的不重复来源 URL
        """
        sections = markdown.split("---", 2)
        return tuple(dict.fromkeys(self.RE.findall(sections[1]))) if len(sections) >= 3 else ()


class SourceValidator:
    """仅执行离线 URL 格式校验，避免将未联网的数据称为已核实。"""

    def validate(self, url: str) -> str | None:
        """检查 HTTPS、域名和凭据泄露风险。

        :param url: 来源 URL
        :return: 通过时为 None，否则返回问题
        """
        item = urlparse(url)
        if item.scheme != "https" or not item.hostname or item.username or item.password:
            return f"unsafe source URL: {url}"
        return None


class TranslationManager:
    """按稳定内容标识处理真实存在的译文。"""

    def path(self, lang: str, topic: str, slug: str) -> str:
        """构建与现有 SEO 路由一致的译文路径。

        :param lang: 语言
        :param topic: 主题
        :param slug: 内容标识
        :return: 以斜线结尾的路径
        :raises ValueError: 语言或主题不受支持
        """
        if lang not in LANGUAGES or topic not in TOPICS:
            raise ValueError("unknown language or topic")
        return "/" + ("" if lang == "zh" else lang + "/") + topic + "/" + slug + "/"

    def group(self, records: list[ArticleRecord]) -> dict[str, set[str]]:
        """按 translation_key 汇总真实存在的译文。

        :param records: 内容记录
        :return: 翻译标识到已有语言集合
        """
        groups: dict[str, set[str]] = defaultdict(set)
        for record in records:
            groups[record.values["translation_key"]].add(record.values["lang"])
        return dict(groups)


class ContentAuditor:
    """校验 approved 内容的元数据、来源、URL 唯一性及译文对应。"""
    REQUIRED = {"lang", "topic", "translation_key", "review_status", "content_id",
                "title", "description", "date", "updated_at", "author", "permalink"}

    def __init__(self, root: Path) -> None:
        """创建审计器。

        :param root: Astro 项目根路径
        :return: None
        """
        self.root = root
        self.sources = SourceCollector()
        self.validator = SourceValidator()
        self.translations = TranslationManager()

    @staticmethod
    def frontmatter(markdown: str) -> dict[str, str]:
        """解析单层 YAML 标量字段；复杂类型另由 Astro Zod 校验。

        :param markdown: 原始文件
        :return: 字段映射
        :raises ValueError: Frontmatter 缺失
        """
        if not markdown.startswith("---\n") or "\n---\n" not in markdown[4:]:
            raise ValueError("missing frontmatter")
        header = markdown.split("\n---\n", 1)[0][4:]
        result: dict[str, str] = {}
        for line in header.splitlines():
            if line.startswith((" ", "-", "\t")):
                continue
            matched = re.match(r"^([a-z_]+):\s*(.*)$", line)
            if matched:
                result[matched.group(1)] = matched.group(2).strip().strip("'\"")
        return result

    def audit(self) -> AuditReport:
        """离线检查所有文章，不执行写入和发布。

        :return: 结构化审计结果
        :raises OSError: 文件不可读取
        """
        report = AuditReport()
        records: list[ArticleRecord] = []
        ids: set[str] = set()
        urls: set[str] = set()
        for path in sorted((self.root / "src/content/articles").rglob("*.md")):
            report.count += 1
            try:
                markdown = path.read_text(encoding="utf-8")
                fields = self.frontmatter(markdown)
            except (ValueError, OSError) as exc:
                report.errors.append(f"{path}: {exc}")
                continue
            if missing := self.REQUIRED - fields.keys():
                report.errors.append(f"{path}: missing {sorted(missing)}")
                continue
            if fields["review_status"] != "approved":
                report.warnings.append(f"{path}: requires editorial approval")
                continue
            try:
                expected = self.translations.path(fields["lang"], fields["topic"], fields["translation_key"])
                if fields["permalink"] != expected:
                    report.errors.append(f"{path}: expected {expected}")
            except ValueError as exc:
                report.errors.append(f"{path}: {exc}")
                continue
            if fields["content_id"] in ids or fields["permalink"] in urls:
                report.errors.append(f"{path}: duplicate ID or route")
            ids.add(fields["content_id"])
            urls.add(fields["permalink"])
            try:
                published = date.fromisoformat(fields["date"][:10])
                updated = date.fromisoformat(fields["updated_at"][:10])
                if updated < published:
                    report.errors.append(f"{path}: updated before publication")
            except ValueError:
                report.errors.append(f"{path}: invalid dates")
            links = self.sources.collect(markdown)
            if not links:
                report.errors.append(f"{path}: no original sources")
            for link in links:
                if problem := self.validator.validate(link):
                    report.errors.append(f"{path}: {problem}")
            records.append(ArticleRecord(path, fields, links))
        if report.count == 0:
            report.errors.append("no articles")
        for key, locales in self.translations.group(records).items():
            if len(locales) < 2:
                report.warnings.append(f"{key}: no other translation")
        LOG.info("Audited %d content files with %d errors", report.count, len(report.errors))
        return report


class PublishingPipeline:
    """只建立草稿，不允许直接写入已发布文章。"""

    def __init__(self, root: Path) -> None:
        """初始化管线。

        :param root: Astro 项目目录
        :return: None
        """
        self.root = root
        self.normalizer = ContentNormalizer()

    def create_draft(self, slug: str, markdown: str, lang: str = "zh") -> Path:
        """创建唯一草稿，禁止重复覆盖。

        :param slug: 草稿 slug
        :param markdown: 原稿
        :param lang: 语言代码
        :return: 新草稿路径
        :raises ValueError: 不支持语言或 slug
        :raises FileExistsError: 同名草稿已存在
        """
        if lang not in LANGUAGES:
            raise ValueError("unsupported language")
        destination = self.root / "drafts" / lang / (self.normalizer.slug(slug) + ".md")
        destination.parent.mkdir(parents=True, exist_ok=True)
        with destination.open("x", encoding="utf-8") as file:
            file.write(self.normalizer.text(markdown))
        LOG.info("Created non-published draft %s", destination)
        return destination

    def validate(self) -> AuditReport:
        """执行内容审计。:return: 审计结果。"""
        return ContentAuditor(self.root).audit()

    def report(self, destination: Path) -> AuditReport:
        """将审计报告写入正式内容目录之外。

        :param destination: 报告文件路径
        :return: 审计结果
        :raises ValueError: 试图写入正式文章目录
        """
        content_root = (self.root / "src/content").resolve()
        resolved = destination.resolve()
        if resolved == content_root or content_root in resolved.parents:
            raise ValueError("cannot write into published content")
        result = self.validate()
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(json.dumps(result.to_dict(),ensure_ascii=False,indent=2),encoding="utf-8")
        return result
