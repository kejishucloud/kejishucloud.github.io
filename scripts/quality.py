#!/usr/bin/env python3
"""运行确定性内容审计，不自动发布。"""
import json
import logging
import sys
from pathlib import Path
from keji3.pipeline import PublishingPipeline

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    report = PublishingPipeline(Path(__file__).resolve().parents[1]).validate()
    print(json.dumps(report.to_dict(), ensure_ascii=False, indent=2))
    sys.exit(0 if report.passed else 1)
