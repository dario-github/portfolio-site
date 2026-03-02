/* ═══════════════════════════════════════════════════
   Agent Data — OpenClaw 技能 / 教训 / 方法论
   (迁移自 page.tsx)
   ═══════════════════════════════════════════════════ */

export const OPENCLAW_SKILLS = [
  // Finance
  { name: "market-data", domain: "Finance", desc: "金融市场数据统一入口，A股港股美股加密外汇宏观", descEn: "Unified financial market data gateway — A-shares, HK, US, crypto, forex, macro" },
  { name: "quant-toolkit", domain: "Finance", desc: "量化分析工具集，TA-Lib+量化信号+组合优化+选股", descEn: "Quantitative analysis toolkit — TA-Lib, quant signals, portfolio optimization, stock screening" },
  // Research
  { name: "research", domain: "Research", desc: "深度研究+总结，Deep Think+搜索+URL/视频总结", descEn: "Deep research & summarization — Deep Think, search, URL/video summary" },
  { name: "gemini-toolkit", domain: "Research", desc: "Gemini API高级能力，结构化输出+代码执行+协作研讨", descEn: "Gemini API advanced capabilities — structured output, code execution, collaborative discussion" },
  { name: "knowledge-ops", domain: "Research", desc: "知识运维，MemBrain实体提取+信息摄入", descEn: "Knowledge operations — MemBrain entity extraction + information ingestion" },
  { name: "viking-memory", domain: "Research", desc: "分层索引+递归检索", descEn: "Hierarchical indexing + recursive retrieval" },
  { name: "web-search", domain: "Research", desc: "Cloudsway搜索", descEn: "Cloudsway web search" },
  { name: "rss", domain: "Research", desc: "RSS监控", descEn: "RSS feed monitoring" },
  // Content
  { name: "image-gen", domain: "Content", desc: "AI图片生成，Gemini+OpenAI", descEn: "AI image generation — Gemini + OpenAI" },
  { name: "kox", domain: "Content", desc: "视频创作+AgentCore，Stage8+即梦+可灵+NLE", descEn: "Video production + AgentCore — Stage8, Jimeng, Kling, NLE" },
  { name: "media-process", domain: "Content", desc: "视频音频处理，ffmpeg+yt-dlp+Whisper", descEn: "Media processing — ffmpeg + yt-dlp + Whisper" },
  { name: "tts-multi", domain: "Content", desc: "TTS，Edge+Fish+Sense", descEn: "Text-to-speech — Edge + Fish + SenseVoice" },
  { name: "doc-gen", domain: "Content", desc: "文档图表，PPTX+Draw.io", descEn: "Document & diagram generation — PPTX + Draw.io" },
  // Communications
  { name: "slack", domain: "Communications", desc: "Slack完整操作", descEn: "Full Slack operations" },
  { name: "social-media", domain: "Communications", desc: "社媒交互，Moltbook+X研究+TikHub", descEn: "Social media interaction — Moltbook + X Research + TikHub" },
  { name: "feishu-doc", domain: "Communications", desc: "飞书云文档", descEn: "Feishu cloud documents" },
  { name: "gog", domain: "Communications", desc: "Google Workspace", descEn: "Google Workspace (Gmail, Calendar, Drive, Sheets, Docs)" },
  // Development
  { name: "agent-browser", domain: "Development", desc: "Rust headless browser", descEn: "Rust headless browser automation" },
  { name: "coding-agent", domain: "Development", desc: "Codex/Claude Code/OpenCode", descEn: "Codex / Claude Code / OpenCode" },
  { name: "github", domain: "Development", desc: "gh CLI", descEn: "GitHub CLI — repos, PRs, issues" },
  { name: "toolchain", domain: "Development", desc: "Skill Creator+ClawdHub+MCP", descEn: "Skill Creator + ClawdHub + MCP toolchain" },
  // Security
  { name: "security", domain: "Security", desc: "1Password+主机巡检", descEn: "1Password + host security inspection" },
  // Utility
  { name: "seo-geo", domain: "Utility", desc: "SEO+GEO优化", descEn: "SEO + GEO optimization" },
  { name: "session-logs", domain: "Utility", desc: "日志搜索", descEn: "Session log search" },
  { name: "task-manager", domain: "Utility", desc: "Things 3+Reminders", descEn: "Things 3 + Apple Reminders" },
  { name: "weather", domain: "Utility", desc: "天气", descEn: "Weather queries" },
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
      "个人 AI 操作系统 — 45 个技能插件、MemBrain 分层记忆系统、Sub-agent 架构，覆盖从研究到创作的全场景",
    tags: ["Agent OS", "Context Engineering", "MemBrain"],
  },
  {
    title: "因果推断 × 内容归因",
    description:
      "用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移，让团队从「拍脑袋」变成「数据驱动」",
    tags: ["Causal Inference", "DoWhy", "Data Science"],
  },
];
