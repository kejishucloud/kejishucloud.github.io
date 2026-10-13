---
layout: portal
view: article
lang: en
topic: agents
translation_key: reliable-agent-design
review_status: approved
content_id: reliable-agent-design-en
title: "Reliable AI agents: tools, state, approvals and evaluation"
description: "A practical architecture for turning an agent demo into an accountable system."
date: 2026-10-13
updated_at: 2026-10-13
author: kejishucloud
permalink: /en/agents/reliable-agent-design/
sources:
  - title: "LangGraph"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
  - title: "Model Context Protocol"
    url: "https://modelcontextprotocol.io/docs/getting-started/intro"
---

Tool calling is not the same as production readiness. The difference between an impressive agent demo and a reliable system is often **explicit boundaries**: which actions are allowed, what happens when tools fail, who authorizes consequential changes, and how outcomes are evaluated.

## 1. Decide whether you need an agent

Prefer a deterministic workflow when the steps are already known. A daily reporting pipeline that retrieves fixed sources, checks data and asks for approval does not need a model to invent its own process.

Use autonomous planning when the next step truly depends on uncertain information. Even then, define maximum iterations, wall-clock time, budget, accessible resources and stop conditions.

## 2. Design four separate layers

- **Task contract:** objective, inputs, completion criteria and termination.
- **State management:** progress, evidence, pending actions and errors.
- **Tool boundary:** typed arguments, access scopes, timeouts, retries and idempotency.
- **Control plane:** approvals, logging, recovery and human takeover.

Frameworks such as LangGraph support stateful orchestration. They do not grant safety automatically; correctness depends on the application design.

## 3. Enforce least privilege

Start with read-only access. Give writing, messaging, deletion and financial actions separate permissions. Before a high-impact action, show an authorized reviewer the target, effect, risk and reversibility.

Treat websites, retrieved documents, emails and tool outputs as **untrusted input**. Prompt injection can appear inside external content. It must not be promoted into system instructions. Keep secrets in secure runtime configuration—not prompts or logs.

## 4. Evaluate failure, not only success

Build a test set that includes missing data, timeouts, duplicate requests, permission errors, contradictory sources and malicious instructions. Track task success, unauthorized-action attempts, human intervention, total cost, latency and trace completeness.

Inspect the sequence of tool calls rather than grading the final paragraph in isolation. Re-run the suite after changes to models, prompts, connectors or policies.

## 5. Release in controlled stages

Move from offline evaluation to limited pilots and monitored production. Define thresholds that stop new tasks when failure patterns exceed acceptable levels. Maintain a human fallback and an incident log.

**Reliable agents are systems of state, permissions, verification and human oversight—not just longer prompts.**

### Primary references
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [OpenAI Evals](https://platform.openai.com/docs/guides/evals)
