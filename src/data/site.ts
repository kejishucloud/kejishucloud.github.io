export const langs = ['zh', 'en', 'es', 'ja'] as const;
export type Lang = typeof langs[number];
export const langTags: Record<Lang, string> = { zh: 'zh-CN', en: 'en', es: 'es', ja: 'ja' };
export const languageNames: Record<Lang, string> = { zh: '简体中文', en: 'English', es: 'Español', ja: '日本語' };
export const topicKeys = ['frontier', 'ai-work', 'agents', 'tools'] as const;
export type Topic = typeof topicKeys[number];
export const href = (lang: Lang, page = ''): string => '/' + (lang === 'zh' ? '' : lang + '/') + (page ? page.replace(/^\/+|\/+$/g, '') + '/' : '');
export const original = (path: string): string => 'https://kejishucloud.github.io' + path;
export const t: Record<Lang, {
  nav: string; research: string; projects: string; lab: string; about: string; tools: string; search: string;
  kicker: string; lead1: string; lead2: string; intro: string; start: string; code: string; proof: string;
  selected: string; selectedDesc: string; topics: string; topicsDesc: string; articles: string; articlesDesc: string;
  process: string; processDesc: string; creator: string; creatorDesc: string; journal: string;
  more: string; read: string; return: string; sources: string; date: string; updated: string;
  searchHint: string; directory: string; directoryDesc: string; all: string; privacy: string;
  projectDesc: string; labDesc: string; aboutDesc: string; contact: string; footer: string;
  skip: string; back: string; status: string; limitations: string; time: string;
}> = {
  zh: {
    nav:'主导航',research:'洞察',projects:'项目',lab:'实验室',about:'关于',tools:'AI 工具',search:'搜索',
    kicker:'独立研究 / 软件工程 / AI 实践',lead1:'让智能，',lead2:'成为现实。',
    intro:'不追逐每一次技术热点。拆解 AI 如何运作、在哪些情境下可靠，以及如何通过工程实践让它真正发挥作用。',
    start:'探索研究',code:'查看项目',proof:'RESEARCH / BUILD / VERIFY',
    selected:'用真实系统回答问题。', selectedDesc:'公开代码、架构选择与复现方法，远比未经验证的数字更有说服力。',
    topics:'四个领域。持续研究。',topicsDesc:'我们关心的不只是技术能做什么，更关心它怎样影响真实工作。',
    articles:'值得深入的议题。',articlesDesc:'基于来源、说明边界、可复核的技术文章。',
    process:'从问题到可复用流程。',processDesc:'自动化需要可验证输入、清晰的权限与人工复核。',
    creator:'一份独立的创造者记录。',creatorDesc:'从 AI 工具到 Agent 系统，从软件到自动化。这里记录真实项目、研究和设计决策。',
    journal:'技术实践札记',more:'深入了解',read:'阅读文章',return:'返回',sources:'参考来源',date:'发布',updated:'更新',
    searchHint:'搜索已经人工审核的文章与研究主题。',directory:'工具与方法',directoryDesc:'以任务和来源为基准，而不是不可信的排行榜。',
    all:'全部',privacy:'隐私',projectDesc:'来自公开 GitHub 仓库的真实项目与技术决策。没有虚构的使用数据。',
    labDesc:'可复现的实验及交互视觉探索，包含性能与能力降级策略。',
    aboutDesc:'KeJiShuCloud 是一个面向全球的独立科技研究和工程实践平台。',
    contact:'联系 / 合作',footer:'持续好奇。务实构建。',skip:'跳到内容',back:'返回首页',status:'源代码',limitations:'限制与权衡',time:'分钟阅读'
  },
  en: {
    nav:'Primary navigation',research:'Insights',projects:'Projects',lab:'Lab',about:'About',tools:'AI Tools',search:'Search',
    kicker:'INDEPENDENT RESEARCH / SOFTWARE ENGINEERING / PRACTICAL AI',lead1:'Intelligence,',lead2:'engineered.',
    intro:'Beyond the headlines. We examine how AI actually works, where its limits are, and how to turn promising ideas into systems you can test and use.',
    start:'Explore research',code:'View the work',proof:'RESEARCH / BUILD / VERIFY',
    selected:'Built to answer real questions.',selectedDesc:'Open code, architectural trade-offs and reproducible methods—not invented success metrics.',
    topics:'Four fields. One pursuit.',topicsDesc:'Not just what technology can do, but what it changes in actual work.',
    articles:'Questions worth going deep on.',articlesDesc:'Source-backed technical writing, with limitations and a clear path to verification.',
    process:'From questions to repeatable work.',processDesc:'Automation demands verifiable inputs, explicit permissions and human review.',
    creator:'An independent field journal.',creatorDesc:'From AI tooling and agents to software systems. A record of real projects, research and design decisions.',
    journal:'FIELD NOTES',more:'Explore',read:'Read article',return:'Return',sources:'Primary references',date:'Published',updated:'Updated',
    searchHint:'Search research and articles that have passed editorial review.',directory:'Tools and methods',directoryDesc:'Compare by task and sources, not unverified leaderboards.',
    all:'All',privacy:'Privacy',projectDesc:'Real public GitHub repositories and their architectural decisions. No invented metrics.',
    labDesc:'Reproducible experiments and interactive graphics with deliberate performance fallbacks.',
    aboutDesc:'KeJiShuCloud is an independent global publication and engineering practice exploring AI, automation and technology.',
    contact:'Contact / Collaborate',footer:'Stay curious. Build deliberately.',skip:'Skip to content',back:'Back home',status:'Source code',limitations:'Trade-offs',time:'min read'
  },
  es: {
    nav:'Navegación principal',research:'Análisis',projects:'Proyectos',lab:'Laboratorio',about:'Acerca de',tools:'Herramientas IA',search:'Buscar',
    kicker:'INVESTIGACIÓN INDEPENDIENTE / INGENIERÍA / IA PRÁCTICA',lead1:'Inteligencia,',lead2:'hecha realidad.',
    intro:'Más allá de los titulares. Examinamos cómo funciona la IA, sus límites y cómo transformar ideas en sistemas que se pueden probar.',
    start:'Leer investigaciones',code:'Ver proyectos',proof:'INVESTIGAR / CREAR / VERIFICAR',
    selected:'Resolver problemas reales.',selectedDesc:'Código abierto, decisiones de arquitectura y métodos reproducibles, sin métricas inventadas.',
    topics:'Cuatro campos. Una búsqueda.',topicsDesc:'No solo lo que la tecnología hace, sino lo que cambia en el trabajo.',
    articles:'Preguntas para profundizar.',articlesDesc:'Análisis con fuentes, límites y procedimientos verificables.',
    process:'De la pregunta al método.',processDesc:'La automatización requiere datos verificables, permisos claros y revisión humana.',
    creator:'Un diario independiente.',creatorDesc:'Herramientas, agentes y software: proyectos reales y decisiones documentadas.',
    journal:'NOTAS DE CAMPO',more:'Explorar',read:'Leer artículo',return:'Volver',sources:'Fuentes primarias',date:'Publicado',updated:'Actualizado',
    searchHint:'Busca artículos e investigaciones revisados.',directory:'Herramientas y métodos',directoryDesc:'Comparaciones por tareas y fuentes, sin clasificaciones sin pruebas.',
    all:'Todo',privacy:'Privacidad',projectDesc:'Repositorios públicos reales y decisiones de diseño verificables.',
    labDesc:'Experimentos reproducibles con alternativas de rendimiento.',
    aboutDesc:'KeJiShuCloud es un espacio independiente y global de investigación sobre IA, automatización e ingeniería.',
    contact:'Contacto',footer:'Curiosidad constante. Ingeniería consciente.',skip:'Ir al contenido',back:'Inicio',status:'Código fuente',limitations:'Limitaciones',time:'min de lectura'
  },
  ja: {
    nav:'メインナビゲーション',research:'考察',projects:'プロジェクト',lab:'ラボ',about:'概要',tools:'AIツール',search:'検索',
    kicker:'独立した研究 / ソフトウェア開発 / 実用的なAI',lead1:'知能を探究。',lead2:'技術で実装。',
    intro:'話題を追うだけでなく、AIの仕組みと限界を検証し、試せる技術とシステムにつなげます。',
    start:'研究を読む',code:'プロジェクトを見る',proof:'研究 / 構築 / 検証',
    selected:'実際の課題を解く。',selectedDesc:'架空の数値ではなく、公開コード、設計の判断、再現できる方法を示します。',
    topics:'四つの領域。一つの探究。',topicsDesc:'技術ができることだけでなく、実際の仕事への影響を考えます。',
    articles:'深く考えるべきテーマ。',articlesDesc:'出典と限界を明示した、検証可能な技術記事。',
    process:'問いから再現できる流れへ。',processDesc:'入力の検証、権限の設定、人間による確認を大切にします。',
    creator:'独立した開発の記録。',creatorDesc:'AIツールからエージェント、ソフトウェアまで。実際の開発と判断を記録します。',
    journal:'フィールドノート',more:'詳しく見る',read:'記事を読む',return:'戻る',sources:'参考資料',date:'公開',updated:'更新',
    searchHint:'レビュー済みの記事と研究を検索します。',directory:'ツールと方法',directoryDesc:'根拠のないランキングではなく、用途と資料で比較します。',
    all:'すべて',privacy:'プライバシー',projectDesc:'公開GitHubリポジトリと、その技術設計を紹介します。',
    labDesc:'再現できる実験と、性能面の代替手段を備えたインタラクション。',
    aboutDesc:'KeJiShuCloudは、AI・自動化・ソフトウェア開発を扱う独立した国際的な技術メディアです。',
    contact:'連絡先',footer:'探究を続け、慎重につくる。',skip:'本文へ',back:'ホーム',status:'ソースコード',limitations:'制約',time:'分で読める'
  }
};

export const topics = {
  frontier: { n:'01', key:'TECHNOLOGY / SIGNALS', zh:['科技前沿','理解模型、算力、研究和系统性变迁。'],en:['Technology Insights','What research and emerging systems really change.'],es:['Tecnología','Investigación, sistemas y cambios importantes.'],ja:['技術インサイト','研究と技術の変化を理解する。'] },
  'ai-work': { n:'02', key:'WORK / METHODS',zh:['AI 办公','让研究、文档与协作更可复现。'],en:['AI at Work','Repeatable research, writing and collaboration.'],es:['IA en el trabajo','Métodos reproducibles para tareas cotidianas.'],ja:['AI仕事術','調査、文章、協働を改善する。'] },
  agents: { n:'03', key:'AGENTS / SYSTEMS',zh:['AI 智能体','以权限、状态、工具和评测构建可靠系统。'],en:['AI Agents','Dependable systems with tools, state and evaluations.'],es:['Agentes de IA','Sistemas fiables con herramientas y evaluación.'],ja:['AIエージェント','権限、状態、ツール、評価を設計。'] },
  tools: { n:'04', key:'TOOLS / DECISIONS',zh:['AI 工具','从任务、成本、隐私与限制出发选择工具。'],en:['AI Tools','Choose through jobs, cost, privacy and constraints.'],es:['Herramientas IA','Elegir por tareas, costes y privacidad.'],ja:['AIツール','用途、費用、個人情報で比較。'] }
} as const;

export const projects = [
  {
    id:'remoteops', title:'RemoteOps', type:'SYSTEMS / AUTOMATION',
    repo:'https://github.com/kejishucloud/RemoteOps',
    stack:['Python','WebSocket','MCP','OAuth 2.0'],
    visual:'remote', number:'01',
    detail: {
      zh:'自托管多设备远程运维平台。通过 Gateway 管理不同系统的设备连接、授权与工具调用。',
      en:'Self-hosted multi-device operations with a centralized gateway, scoped access and MCP tool routing.',
      es:'Operaciones multidispositivo autohospedadas con gateway, permisos y herramientas MCP.',
      ja:'ゲートウェイと権限管理を備えた、セルフホスト型のマルチデバイス運用基盤。'
    }
  },
  {
    id:'readify', title:'Readify', type:'AI / KNOWLEDGE',
    repo:'https://github.com/kejishucloud/Readify',
    stack:['Python','Django','AI','TTS'], visual:'readify',number:'02',
    detail: {
      zh:'面向多格式图书的 AI 阅读应用，整合翻译、问答、知识提取和语音能力。',
      en:'An AI-assisted reading system bringing together multilingual translation, document understanding and text-to-speech.',
      es:'Aplicación de lectura con traducción multilingüe, análisis documental y síntesis de voz.',
      ja:'多言語翻訳、文書理解、音声合成を組み合わせたAI読書アプリ。'
    }
  },
  {
    id:'depthforge', title:'DepthForge', type:'COMPUTER VISION / 3D',
    repo:'https://github.com/kejishucloud/DepthForge',
    stack:['Python','RealSense','RGB-D','3D'], visual:'depth',number:'03',
    detail: {
      zh:'基于 RealSense D435 的 RGB-D 三维扫描重建，覆盖采集、追踪、融合和模型导出。',
      en:'RGB-D reconstruction with the RealSense D435—from capture and tracking to fusion and model export.',
      es:'Reconstrucción RGB-D con RealSense D435: captura, seguimiento, fusión y exportación.',
      ja:'RealSense D435を用いたRGB-Dの撮影、追跡、融合、モデル書き出し。'
    }
  }
] as const;

export const workflows = [
  { key:'research', zh:['证据优先的 AI 研究','定义问题 → 收集原始来源 → 独立核验 → 人工审批'],en:['Evidence-first research','Scope → primary sources → independent checks → human review'],es:['Investigación con fuentes','Alcance → fuentes → verificación → revisión humana'],ja:['根拠に基づく調査','課題設定 → 原典 → 独立検証 → 人間の確認'], slug:'evidence-first-ai-research',topic:'ai-work' },
  { key:'agent', zh:['可靠智能体工程','任务契约 → 权限设计 → 工具轨迹 → 失败评测'],en:['Reliable agent engineering','Task contract → permissions → tool traces → failure evaluation'],es:['Agentes fiables','Contrato → permisos → trazas → pruebas de fallos'],ja:['信頼できるエージェント','契約 → 権限 → 呼び出し履歴 → 失敗評価'],slug:'reliable-agent-design',topic:'agents' }
] as const;

export const toolCatalog = [
  {name:'NotebookLM',category:'Research',purpose:{zh:'基于指定材料整理来源与研究笔记',en:'Source-grounded research and notebook workflows',es:'Investigación basada en fuentes',ja:'資料に基づく調査ノート'},url:'https://support.google.com/notebooklm/',checked:'2026-11-13'},
  {name:'LangGraph',category:'Agents',purpose:{zh:'有状态的 Agent / 工作流编排',en:'Stateful orchestration for agents and workflows',es:'Orquestación de agentes con estado',ja:'状態を持つエージェントの編成'},url:'https://docs.langchain.com/oss/python/langgraph/overview',checked:'2026-11-13'},
  {name:'Hugging Face Evaluate',category:'Research',purpose:{zh:'可复用的模型和数据评估流程',en:'Reusable model and dataset evaluation workflows',es:'Evaluación reproducible de modelos',ja:'再現可能なモデル評価'},url:'https://huggingface.co/docs/evaluate/index',checked:'2026-11-13'},
  {name:'n8n',category:'Automation',purpose:{zh:'可视化工作流编排与服务连接',en:'Visual workflow composition and service connections',es:'Flujos visuales e integraciones',ja:'ビジュアルワークフローと連携'},url:'https://docs.n8n.io/',checked:'2026-11-13'}
] as const;
