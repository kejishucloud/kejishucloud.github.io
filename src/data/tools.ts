import { toolCatalog, type Lang } from './site';

export const directory = toolCatalog.map((item) => ({
  ...item,
  slug: item.name === 'Hugging Face Evaluate' ? 'hugging-face-evaluate' : item.name.toLowerCase()
})) as Array<(typeof toolCatalog)[number] & {slug:string}>;

export type DirectoryItem = (typeof directory)[number];

type Detail = { useCase: string; limits: string; workflow: string };
export const toolDescriptions: Record<string, Record<Lang, Detail>> = {
  notebooklm: {
    zh: { useCase:'围绕指定的来源资料建立笔记与问答工作流。', limits:'输出内容仍需回到原始文件逐项核对；敏感资料应先检查所在组织的数据政策。', workflow:'上传获授权的来源 → 提问与整理 → 打开原始引用 → 人工核对' },
    en: { useCase:'Research and note-taking grounded in a selected set of sources.', limits:'Verify important claims against the original files, and check organizational data policies before uploading sensitive documents.', workflow:'Approved sources → questions and notes → open citations → human verification' },
    es: { useCase:'Investigación y notas basadas en fuentes seleccionadas.', limits:'Comprueba las afirmaciones en los documentos originales y las políticas de datos antes de cargar información sensible.', workflow:'Fuentes autorizadas → preguntas → citas → verificación' },
    ja: { useCase:'選択した資料に基づく調査とノート作成。', limits:'重要な事実は原資料で確認し、機密情報のアップロード前に組織のルールを確認してください。', workflow:'許可された資料 → 質問 → 引用 → 人間による確認' }
  },
  langgraph: {
    zh: { useCase:'构建具有明确状态和控制流程的 Agent 与自动化工作流。', limits:'框架本身不会自动提供权限隔离、预算限制或可靠性评测；必须由应用设计实现。', workflow:'定义任务状态 → 约束工具调用 → 加入人工审批 → 回放失败轨迹' },
    en: { useCase:'Orchestrate stateful agents and workflows with explicit control flow.', limits:'The framework does not itself guarantee access control, budget caps or reliability evaluation. These remain application responsibilities.', workflow:'Define state → scope tools → human approval → replay failure traces' },
    es: { useCase:'Orquestar agentes con estado y flujos explícitos.', limits:'El marco no garantiza por sí mismo controles de acceso ni evaluaciones de fiabilidad.', workflow:'Definir estado → limitar herramientas → aprobación humana → pruebas' },
    ja: { useCase:'状態と制御フローを明示したエージェントの設計。', limits:'権限制御や費用制限、信頼性評価はアプリ側で実装する必要があります。', workflow:'状態 → ツール制限 → 承認 → 失敗履歴の検証' }
  },
  'hugging-face-evaluate': {
    zh: { useCase:'组织重复执行的模型与数据集评估，保存指标和输入条件。', limits:'单个自动评分不能代替真实业务样本、风险测试或独立人工审核。', workflow:'定义数据集 → 固定版本与指标 → 运行评估 → 复核失败样本' },
    en: { useCase:'Run reproducible evaluation workflows over models and datasets.', limits:'A single automatic metric cannot replace domain-specific samples, risk testing or independent human review.', workflow:'Dataset → versions and metrics → evaluation run → inspect failures' },
    es: { useCase:'Repetir evaluaciones de modelos con datos y métricas definidos.', limits:'Una sola métrica no sustituye pruebas reales ni revisión humana independiente.', workflow:'Conjunto de datos → métricas → evaluación → revisión de errores' },
    ja: { useCase:'データセットとモデルの再現可能な評価。', limits:'単独の自動指標は実業務の試験や第三者の確認を代替できません。', workflow:'データ → バージョンと指標 → 評価 → 失敗例の確認' }
  },
  n8n: {
    zh: { useCase:'连接服务并编排基于触发器与节点的自动化工作流。', limits:'第三方连接器需要权限审查、失败重试、人工审批和幂等保护；具体可用性依配置而异。', workflow:'事件触发 → 节点流程 → 权限审批 → 错误恢复与日志' },
    en: { useCase:'Compose trigger-based automation across service integrations.', limits:'Review connector permissions, retries, human approvals and idempotency. Availability depends on configuration and services.', workflow:'Trigger → workflow nodes → approval boundary → recovery and logs' },
    es: { useCase:'Automatizar procesos por eventos entre servicios conectados.', limits:'Revisa permisos, reintentos y aprobaciones; la disponibilidad depende de la configuración.', workflow:'Evento → nodos → aprobación → recuperación' },
    ja: { useCase:'サービス連携を用いたトリガー型の業務自動化。', limits:'接続先の権限、再試行、承認、重複実行対策を確認してください。', workflow:'トリガー → ノード → 承認 → 回復とログ' }
  }
};
export const catalogCopy: Record<Lang, {
 compare: string; details:string; source:string; task:string; boundaries:string; workflow:string; back:string;
 intro:string; checked:string; compareIntro:string; category:string; disclaimer:string;
}> = {
 zh:{compare:'对比工具',details:'工具资料',source:'官方文档',task:'适用场景',boundaries:'使用边界',workflow:'参考工作流',back:'返回工具目录',intro:'以任务与技术边界理解工具，而非用空泛评分做排名。',checked:'资料登记日期',compareIntro:'这是不同定位工具的用途对照，不是直接性能排名；所有说明指向各自官方文档。',category:'技术领域',disclaimer:'无独立实测数据、实时价格或性能评分。请在采用前核对当前版本与官方服务条款。'},
 en:{compare:'Compare tools',details:'Tool profile',source:'Official documentation',task:'Best suited for',boundaries:'Considerations',workflow:'Reference workflow',back:'Back to tools',intro:'Understand the job and engineering constraints before choosing a tool.',checked:'Reference indexed',compareIntro:'Compare roles across different kinds of tools—not a claim of equivalent performance. Each entry links to original documentation.',category:'Category',disclaimer:'No independent benchmarks, live pricing or rankings are claimed. Recheck current versions and terms before adoption.'},
 es:{compare:'Comparar herramientas',details:'Perfil de herramienta',source:'Documentación oficial',task:'Para qué sirve',boundaries:'Limitaciones',workflow:'Flujo sugerido',back:'Volver al directorio',intro:'Compara necesidades y límites, no puntuaciones sin pruebas.',checked:'Referencia registrada',compareIntro:'Comparación de propósitos, no una clasificación de rendimiento.',category:'Categoría',disclaimer:'No se presentan pruebas propias ni precios en tiempo real. Consulta las condiciones oficiales.'},
 ja:{compare:'ツールを比較',details:'ツール情報',source:'公式ドキュメント',task:'主な用途',boundaries:'注意事項',workflow:'参考ワークフロー',back:'ツール一覧へ',intro:'点数ではなく用途と技術上の制約で比較します。',checked:'資料登録日',compareIntro:'異なる用途を比較するもので、性能順位ではありません。',category:'分類',disclaimer:'独自ベンチマークや最新価格を示すものではありません。採用前に公式情報を確認してください。'}
};
