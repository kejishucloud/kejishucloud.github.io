---
layout: portal
view: article
lang: ja
topic: agents
translation_key: reliable-agent-design
review_status: approved
content_id: reliable-agent-design-ja
title: "信頼できるAIエージェント設計：状態・権限・評価"
description: "ツール、状態管理、人間の承認、評価を組み合わせたエージェント設計。"
date: 2026-10-13
updated_at: 2026-10-13
author: kejishucloud
permalink: /ja/agents/reliable-agent-design/
sources:
  - title: "LangGraph"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
  - title: "Model Context Protocol"
    url: "https://modelcontextprotocol.io/docs/getting-started/intro"
---

ツールを呼び出せるエージェントが、そのまま本番で安全に使えるわけではありません。重要なのは**実行できる操作と失敗時の対応を明確にすること**です。

## 1. 固定フローと自律型を区別する

作業手順が決まっているなら、決定的なワークフローを優先します。次の作業を不確かな情報から選ぶ必要がある場合だけ、自律性を導入します。その場合も回数、時間、費用、アクセス範囲、終了条件を制限します。

## 2. 4つの層を設計する

- **タスク：** 目的、入力、成功と終了の条件。
- **状態：** 進捗、証拠、エラーと保留事項。
- **ツール：** 引数の型、権限、タイムアウト、再試行。
- **制御：** 人間の承認、監査、復旧。

LangGraphなどは状態管理を助けますが、権限設計を自動で保証するものではありません。

## 3. 最小権限を徹底する

読み取りを基本とし、書き込み、送信、削除には別の承認を設けます。外部ページや文書は信頼できない入力として扱い、プロンプト注入を想定します。秘密鍵をプロンプトやログに保存してはいけません。

## 4. 失敗例で評価する

データ欠損、APIのタイムアウト、重複リクエスト、権限不足、矛盾する情報、悪意ある指示を含むテストを準備します。成功率に加え、費用、遅延、誤操作、人間の介入率とツール実行履歴を評価します。

## 5. 段階的に公開する

オフライン評価、小規模実証、監視付きの本番運用へ進めます。モデルやツールを変えたら回帰テストを実行し、異常時に人間へ切り替えるルールを設けます。

**信頼性はモデル単体ではなく、状態・権限・検証・人間の監督によって実現します。**

### 一次資料
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [OpenAI Evals](https://platform.openai.com/docs/guides/evals)
