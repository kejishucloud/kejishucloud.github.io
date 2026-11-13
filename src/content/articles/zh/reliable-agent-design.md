---
layout: portal
view: article
lang: zh
topic: agents
translation_key: reliable-agent-design
review_status: approved
content_id: reliable-agent-design-zh
title: "可靠 AI 智能体的架构：工具、状态、审批与评测"
description: "把 Agent 从演示效果转变为可控、可审计的工程系统。"
date: 2026-10-13
updated_at: 2026-10-13
author: kejishucloud
permalink: /agents/reliable-agent-design/
sources:
  - title: "LangGraph"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
  - title: "Model Context Protocol"
    url: "https://modelcontextprotocol.io/docs/getting-started/intro"
---

一个智能体能调用工具，并不代表它适合上线。真正影响可靠性的通常不是提示词长度，而是**边界设计**：模型能做什么、不能做什么、失败时如何恢复，以及谁负责批准高风险动作。

## 1. 区分工作流与自主智能体

如果任务步骤固定，优先使用确定性工作流。例如每天从固定来源提取报表、校验数据、发给指定审核人，不需要让模型自由决定整个流程。

只有当任务需要根据不确定信息选择下一步时，才考虑引入自主规划。即使如此，也应该限定最大轮数、时间预算、可访问资源和终止条件。

## 2. 把系统拆成四层

- **任务层**：目标、输入、成功条件、停止规则。
- **状态层**：记录当前计划、已完成步骤、证据和错误。
- **工具层**：对搜索、文件、数据库、邮件等接口定义参数模式、权限与超时。
- **控制层**：审批、日志、异常恢复以及人工接管。

LangGraph 等框架可用于有状态的工作流编排，但框架并不能代替权限设计。

## 3. 用最小权限管理工具

从只读能力开始，分别授权写入、外发、删除或支付等操作。高影响动作在真正执行前应呈现目标、影响范围和可撤销性，让授权人员确认。

外部网页、文档、邮件及工具返回值都属于**不可信输入**。它们可能带有提示注入，因此不能被提升成系统规则。密钥应存放在服务端安全配置中，而不是写在提示词或日志里。

## 4. 用失败用例定义可靠性

评测集不能只有三个成功演示。至少覆盖正常流程、缺失信息、工具超时、重复请求、权限不足、冲突来源以及恶意指令。

衡量任务完成率、错误动作率、人工介入率、平均成本、延迟和输出可追溯性。要保存必要的工具调用轨迹，以便识别失败发生在哪一步。

## 5. 建立安全发布流程

从离线测试到小范围试点，再到带有监控的正式部署。更新模型、提示词或工具后执行回归测试，记录差异；当错误超过预设阈值时，自动停止新任务并切换到人工处理。

**结论：可信 Agent 是权限、状态、验证和人工监督共同构成的系统。**

### 资料来源
- [LangGraph 官方文档](https://docs.langchain.com/oss/python/langgraph/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [OpenAI Evals 指南](https://platform.openai.com/docs/guides/evals)
