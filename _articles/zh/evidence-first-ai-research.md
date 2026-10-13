---
layout: portal
view: article
lang: zh
topic: ai-work
translation_key: evidence-first-ai-research
review_status: approved
content_id: evidence-first-ai-research-zh
title: "AI 研究工作流：从问题拆解到可追溯结论"
description: "构建有来源、能验证、可重复使用的 AI 辅助研究流程。"
date: 2026-10-13
updated_at: 2026-10-13
author: kejishucloud
permalink: /ai-work/evidence-first-ai-research/
sources:
  - title: "NotebookLM"
    url: "https://support.google.com/notebooklm/"
  - title: "Hugging Face Evaluate"
    url: "https://huggingface.co/docs/evaluate/index"
---

真正可靠的 AI 研究不是“把一个问题丢给聊天机器人”。研究的目标是形成**能够追溯依据、接受质疑并可以复查的判断**。AI 可以帮助拆分任务、整理文本和发现遗漏，但事实的责任仍属于研究者。

## 1. 先定义决策，而不是提示词

开始之前写下：谁会使用这份结论、需要决定什么、时间范围是什么、哪些证据属于可接受来源，以及哪些信息还未知。比如“为一个 20 人团队选择知识库 AI 工具”，就应该先规定数据驻留、权限模型、预算和集成需求，而不是让模型给出“十大最佳工具”。

把问题拆成可以核实的子问题：技术能力、使用成本、信息安全、迁移成本、区域可用性。每个子问题都应有一个明确的证据来源和检查方法。

## 2. 建立来源登记表

推荐使用最简单的表格记录：

| 字段 | 用途 |
| --- | --- |
| Claim | 一条待验证的事实或判断 |
| Source URL | 直接指向原始说明或研究 |
| Published / Accessed | 发布日期与查阅日期 |
| Evidence | 原文、数据或可复现步骤 |
| Confidence | 已确认、暂定或待验证 |
| Reviewer | 最终核验人员 |

优先阅读产品文档、研究论文、标准或原始数据；辅助使用专业媒体和社区经验。社区反馈可以提供场景线索，但不能替代独立的测试结果。

## 3. 使用 AI 进行结构化整理

让模型输出**问题—证据—结论—不确定性**四列，而不是只输出漂亮的段落。要求它指出哪些信息并没有来源，并为这些项目标注“待验证”。

当模型提到数据或论文时，必须手动打开链接，检查标题、作者、发表时间和结论是否真实对应。一个看似标准的引用可能是错误的，甚至根本不存在。

## 4. 用反证检查结论

至少提出三个挑战：“在哪些情况下这个结论会失效？”“与之相反的证据是什么？”“如果改用另一种工作流程，结果会不同吗？”对于重要结论，还应该让另一位审阅者独立复查，不要用同一个模型的第二次回答冒充独立验证。

## 5. 沉淀成可复用的研究产物

报告至少应该包含：问题定义、证据清单、结论、未解决问题、适用边界、更新时间。随着工具和政策变化，旧文章需要重新审查。对于涉及隐私或业务敏感信息的资料，应先检查内部政策，避免把机密文件上传到未经批准的 AI 服务。

**核心原则：AI 加快资料处理，人类负责证据质量。**

### 延伸资料
- [NotebookLM 帮助中心](https://support.google.com/notebooklm/)：基于指定资料组织研究。
- [Hugging Face Evaluate](https://huggingface.co/docs/evaluate/index)：理解可重复的评测流程。
- [pandas 文档](https://pandas.pydata.org/docs/)：独立复核结构化数据。
