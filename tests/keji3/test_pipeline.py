"""Python 内容系统：安全和幂等性测试。"""
from __future__ import annotations
import sys
import tempfile
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
from keji3.pipeline import (ContentNormalizer, PublishingPipeline,
                            SourceCollector, SourceValidator, TranslationManager)


class PipelineTest(unittest.TestCase):
    """核心内容管线单元测试。"""

    def test_slug(self) -> None:
        """检查稳定标识生成。:return: None。"""
        self.assertEqual(ContentNormalizer.slug("Reliable AI Agents!"), "reliable-ai-agents")
        with self.assertRaises(ValueError):
            ContentNormalizer.slug("///")

    def test_sources(self) -> None:
        """检查来源提取、安全 URL 与去重。:return: None。"""
        source = "---\nsources:\n  - url: https://example.com/docs\n  - url: https://example.com/docs\n---\n"
        self.assertEqual(SourceCollector().collect(source), ("https://example.com/docs",))
        self.assertIsNone(SourceValidator().validate("https://example.com"))
        self.assertIsNotNone(SourceValidator().validate("http://example.com"))

    def test_localized_route(self) -> None:
        """检查中文与日文的真实路由。:return: None。"""
        self.assertEqual(TranslationManager().path("zh", "agents", "abc"), "/agents/abc/")
        self.assertEqual(TranslationManager().path("ja", "agents", "abc"), "/ja/agents/abc/")

    def test_write_once(self) -> None:
        """确保草稿只能创建一次且不会目录逃逸。:return: None。"""
        with tempfile.TemporaryDirectory() as directory:
            manager = PublishingPipeline(Path(directory))
            file = manager.create_draft("../safe", "# Draft\r\n")
            self.assertEqual(file.read_text(), "# Draft\n")
            self.assertTrue(file.resolve().is_relative_to(Path(directory).resolve()))
            with self.assertRaises(FileExistsError):
                manager.create_draft("../safe", "# Override")


if __name__ == "__main__":
    unittest.main()
