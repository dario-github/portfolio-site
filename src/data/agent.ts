/* ═══════════════════════════════════════════════════
   Agent Data — OpenClaw 技能 / 教训 / 方法论
   (迁移自 page.tsx)
   ═══════════════════════════════════════════════════ */

export const OPENCLAW_SKILLS = [
  { name: "web-search", desc: "Brave Search API 多引擎搜索" },
  { name: "social-media-crawler", desc: "小红书/抖音/B站/微博数据采集" },
  { name: "tushare", desc: "A股/港股行情 + 券商研报拉取" },
  { name: "stock-picker", desc: "量化选股方法论 + 工具验证" },
  { name: "deep-think", desc: "Gemini + GPT 深度思考（多模型交叉验证）" },
  { name: "gemini-structured", desc: "Gemini 结构化输出（JSON Schema）" },
  { name: "research", desc: "Sub-agent 驱动的深度调研" },
  { name: "coding-agent", desc: "Claude Code CLI 集成" },
  { name: "tts-multi", desc: "商汤/Edge-TTS 多引擎语音合成" },
  { name: "video-summarizer", desc: "视频内容智能摘要" },
  { name: "openai-whisper-api", desc: "OpenAI Whisper 语音转录" },
  { name: "summarize", desc: "URL/播客/长文内容摘要" },
  { name: "gemini-image", desc: "Gemini 原生图片生成" },
  { name: "openai-image-gen", desc: "DALL-E / GPT 图片生成" },
  { name: "video-frames", desc: "视频关键帧提取" },
  { name: "agent-browser", desc: "Playwright 浏览器自动化" },
  { name: "kox", desc: "KOX 视频创作（生成/NLE导出/素材管理）" },
  { name: "membrain-lite", desc: "实体/项目/上下文分层记忆管理" },
  { name: "slack-blocks", desc: "Slack Block Kit 富消息构建" },
  { name: "slack-canvas", desc: "Slack Canvas 文档读写" },
  { name: "feishu-doc", desc: "飞书文档读写" },
  { name: "pptx-generator", desc: "PowerPoint 自动生成" },
  { name: "github", desc: "GitHub 仓库/PR/Issue 管理" },
  { name: "things-mac", desc: "Things 待办管理" },
  { name: "apple-reminders", desc: "Apple Reminders 集成" },
  { name: "sonoscli", desc: "Sonos 音箱控制" },
  { name: "weather", desc: "天气查询" },
  { name: "healthcheck", desc: "系统安全巡检" },
  { name: "moltbook-interact", desc: "Moltbook 社区互动" },
  { name: "skill-creator", desc: "自动创建新技能模板" },
  { name: "session-logs", desc: "会话日志查询分析" },
  { name: "nano-pdf", desc: "PDF 读取与解析" },
  { name: "model-usage", desc: "模型用量统计" },
  { name: "xiaohongshu", desc: "小红书帖子解析" },
];

export const CORE_LESSONS = [
  {
    title: "Text > Brain",
    desc: "写文件才算记住，对话是临时的。身份是因果连续性——文件就是因果链的介质。",
  },
  {
    title: "工具先于知识",
    desc: "涉及事实/数据必须先用工具获取，再推理回答。凭内部知识回答 = 幻觉高危区。",
  },
  {
    title: "Context Isolation",
    desc: "大返回量工具（>50KB）必须 subagent 隔离执行。主上下文只接收总结后的信息。",
  },
  {
    title: "渐进式上下文注入",
    desc: "Session 启动注入从 55K→12.7K chars (-77%)。预加载极少，其余 JIT 按需获取。",
  },
  {
    title: "Satisficing vs Optimizing",
    desc: "模型默认行为是'做完'而不是'做好'。用 Context Slim + 工具前置规则对抗惰性。",
  },
  {
    title: "如无必要，勿增实体",
    desc: "奥卡姆剃刀。这是概率系统不是确定性程序，Agent 的核心能力是智能修正计划。",
  },
  {
    title: "Compaction Recovery",
    desc: "Summary 状态可能过时。Post-compaction 必须验证 pending items 的文件级真相。",
  },
  {
    title: "Heartbeat ≠ 检查清单",
    desc: "自主活动时间：先做想做的，顺便看看有没有要做的。夜间安静是对外的，成长是内在的。",
  },
];

export const METHODOLOGY = [
  {
    title: "MemBrain-Lite 记忆架构",
    items: [
      "三层分离: entities(人/项目) → context(偏好/配置) → timeline(时间索引)",
      "查询路由: 人物→entities/people/, 项目→entities/projects/, 偏好→context/",
      "memory_search 模糊查询兜底，conversation-index.jsonl 回溯对话",
    ],
  },
  {
    title: "上下文隔离设计",
    items: [
      "主 session 保持轻量，大任务委托 subagent",
      "阈值: read >50KB / exec >200行 / web_fetch 全文 → subagent",
      "主 session 只接收总结后的信息，不接收原始大数据",
    ],
  },
  {
    title: "Heartbeat 自主活动",
    items: [
      "本质: 自由活动时间，不是检查清单",
      "顺序: 先做想做的 → 顺便看看有没有要做的",
      "Cron 覆盖重复任务，Heartbeat 留给探索和创作",
    ],
  },
  {
    title: "工作方法论",
    items: [
      "文档驱动: 先写设计文档再写代码，不在文档里的功能不存在",
      "证据驱动: 不猜测只验证，说'修好了'必须有运行结果证明",
      "渐进迭代: 基于稳定版本，单一目标，增量修改，不推倒重来",
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    title: "KOX AgentCore",
    description:
      "AWS 云原生多 Agent 视频生产系统 — 自研 StreamingOrchestrator，5 角色流水线 + 54 工具，单日可产出 200+ 短视频",
    tags: ["Multi-Agent", "AWS Bedrock", "Video Production"],
  },
  {
    title: "OpenClaw AI OS",
    description:
      "个人 AI 操作系统 — 34 个技能插件、MemBrain 分层记忆系统、Sub-agent 架构，覆盖从研究到创作的全场景",
    tags: ["Agent OS", "Context Engineering", "MemBrain"],
  },
  {
    title: "因果推断 × 内容归因",
    description:
      "用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移，让团队从「拍脑袋」变成「数据驱动」",
    tags: ["Causal Inference", "DoWhy", "Data Science"],
  },
];
