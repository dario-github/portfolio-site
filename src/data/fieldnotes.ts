/* ═══════════════════════════════════════════════════
   Fieldnotes Data — shared between homepage & sub-pages
   ═══════════════════════════════════════════════════ */

export interface FieldNote {
  slug: string;
  title: string;
  tldr: string;
  date: string;
  confidence: "high" | "medium" | "speculative";
  revision: number;
  tags: string[];
  sources: number;
  references: string[];
}

export const FIELDNOTES: FieldNote[] = [
  {
    slug: "agent-memory-architecture",
    title: "AI Agent 长期记忆架构：从 ChatGPT 到 MemBrain 的方案对比",
    tldr: "逆向分析了 ChatGPT/Claude/LlamaIndex/Letta 四种记忆方案，发现工程上的核心 tradeoff 是深度 vs 速度",
    confidence: "high",
    revision: 3,
    date: "2026-02",
    tags: ["Agent Memory", "Architecture", "Engineering"],
    sources: 4,
    references: [
      'OpenAI. "ChatGPT Memory Architecture." Reverse-engineered analysis, 2025.',
      'Anthropic. "Claude Memory System." Team/Enterprise documentation, 2025.',
      'LlamaIndex. "Memory Module Documentation." v0.10+, 2025.',
      'MemBrain. "Entity Extraction & Semantic Units for Agent Memory." GitHub, 2025.',
    ],
  },
  {
    slug: "progressive-context-injection",
    title: "渐进式上下文注入：让 Agent 像人一样导航信息",
    tldr: "Claude Code 的 hybrid model 是目前最成熟的实现——预加载 CLAUDE.md + 工具按需探索",
    confidence: "high",
    revision: 2,
    date: "2026-02",
    tags: ["Context Engineering", "Claude Code", "RAG"],
    sources: 5,
    references: [
      'Anthropic. "Building Effective Agents." Anthropic Research Blog, 2025.',
      'Anthropic. "Claude Code Architecture: Hybrid Context Model." Documentation, 2025.',
      'Cursor Team. "Progressive Context Loading in AI IDEs." Technical Report, 2025.',
      'LlamaIndex. "Agentic RAG: Tool-based Information Navigation." Blog, 2025.',
      'OpenAI. "Responses API: Agentic Context Management." Documentation, 2026.',
    ],
  },
  {
    slug: "workflow-to-agent-mcp",
    title: "从 Workflow+RAG 到 Auto Agent+MCP：范式跃迁的技术决策",
    tldr: "为什么我们放弃了 Dify 式 workflow，拥抱自主 Agent + MCP 协议标准化",
    confidence: "high",
    revision: 2,
    date: "2026-01",
    tags: ["MCP", "Agent Architecture", "Decision"],
    sources: 3,
    references: [
      'Anthropic. "Model Context Protocol Specification." GitHub, 2025.',
      'Dify.ai. "Workflow Orchestration Documentation." 2025.',
      'AWS. "Bedrock AgentCore: Multi-Agent Runtime." Documentation, 2026.',
    ],
  },
  {
    slug: "language-shapes-llm-reasoning",
    title: "语言如何塑造 LLM 的推理能力",
    tldr: "不同语言 prompt 对模型推理的影响远超预期，中文 prompt 的特殊优势和局限",
    confidence: "medium",
    revision: 1,
    date: "2026-02",
    tags: ["LLM", "Multilingual", "Reasoning"],
    sources: 6,
    references: [
      'Qin et al. "Cross-lingual Prompting: Multilingual Reasoning with LLMs." ACL, 2024.',
      'Shi et al. "Language Is Not All You Need: Aligning Perception with Language Models." NeurIPS, 2024.',
      'Huang & Chang. "Towards Reasoning in Large Language Models: A Survey." ACL Findings, 2023.',
      'Sapir, E. "Language: An Introduction to the Study of Speech." 1921.',
      'Wendler et al. "Do Llamas Work in English? On the Latent Language of Multilingual Transformers." EMNLP, 2024.',
      'OpenAI. "GPT-5 Multilingual Reasoning Benchmark Results." Technical Report, 2025.',
    ],
  },
  {
    slug: "causal-inference-content-attribution",
    title: "因果推断在内容归因中的工程实践",
    tldr: "不靠经验选素材，用因果图区分真因果和伪相关——从金融量化到内容营销的方法迁移",
    confidence: "high",
    revision: 2,
    date: "2025-12",
    tags: ["Causal Inference", "Content Attribution", "Data Science"],
    sources: 4,
    references: [
      'Pearl, J. "Causality: Models, Reasoning, and Inference." Cambridge University Press, 2009.',
      'Peters et al. "Elements of Causal Inference." MIT Press, 2017.',
      'Zhang, K. et al. "Causal Discovery from Temporal Data." CMU Technical Report, 2023.',
      'Sharma & Kiciman. "DoWhy: A Python Library for Causal Inference." Microsoft Research, 2024.',
    ],
  },
  {
    slug: "ai-introspection-boundaries",
    title: "AI 自省能力的边界：模型真的知道自己在想什么吗？",
    tldr: "Anthropic 的 introspection 研究揭示了一个反直觉结论：CoT 不一定反映真实推理过程",
    confidence: "speculative",
    revision: 1,
    date: "2026-01",
    tags: ["AI Safety", "Interpretability", "Philosophy"],
    sources: 3,
    references: [
      'Anthropic. "Tracing the Thoughts of a Language Model." Anthropic Research, 2025.',
      'Lanham et al. "Measuring Faithfulness in Chain-of-Thought Reasoning." arXiv:2307.13702, 2023.',
      'Turpin et al. "Language Models Don\'t Always Say What They Think." NeurIPS, 2024.',
    ],
  },
];

/* ── Full article content (keyed by slug) ── */

export const FIELDNOTE_CONTENT: Record<string, string[]> = {
  "agent-memory-architecture": [
    "当我开始构建 OpenClaw 时，面临的第一个核心架构决策就是记忆系统。一个长期运行的 AI Agent 如果没有可靠的记忆，本质上只是一个无状态的 API 调用——每次对话都从零开始，无法积累经验，无法建立对用户的理解。我花了三周时间逆向分析了四种主流方案：ChatGPT Memory、Claude Memory（Team/Enterprise）、LlamaIndex Memory Module、以及 Letta（原 MemGPT）的分层记忆。",

    "ChatGPT 的方案最为简洁：它用一个扁平的 key-value 存储，由模型自行决定何时写入和读取记忆。优点是延迟极低（读取几乎零成本），缺点是深度不足——它只能记住「用户喜欢什么」层面的偏好，无法处理复杂的项目状态或多实体关系。Claude 的企业版走了另一个方向：通过 Project Knowledge 预加载结构化文档，本质上是把记忆外化为文件系统。这在团队协作场景下很强大，但个人使用时显得过重。",

    "LlamaIndex 的方案更偏向工程化：它提供了 Composable Memory 接口，允许开发者自定义记忆的存储、检索和淘汰策略。这给了最大的灵活度，但也意味着你必须自己做所有设计决策。Letta 则提出了最激进的思路——让模型自己管理自己的记忆，通过 self-editing memory 实现类似人类工作记忆的机制。理论上很美，实践中发现模型的「自我管理能力」并不可靠。",

    "最终我为 OpenClaw 设计了 MemBrain-Lite：一个三层分离架构——entities（人物/项目实体）、context（偏好/配置/状态）、timeline（时间索引/事件流）。核心 insight 是：Agent 记忆不应该模仿人类记忆，而应该模仿人类的「文件系统 + 笔记习惯」。Text > Brain——写下来的才算记住。查询路由确保每次读取只加载最小必要上下文，避免上下文窗口被历史信息淹没。",

    "这套架构运行了 4 个月，最大的教训是：记忆系统的核心 tradeoff 不是存储容量或检索精度，而是「深度 vs 速度」。深度记忆（完整的项目上下文、对话历史）让 Agent 更聪明，但加载成本高、容易污染当前上下文；浅层记忆（关键事实、偏好标签）速度快但缺乏洞察力。MemBrain-Lite 的三层分离正是为了在两者之间动态切换——日常对话用浅层快速响应，深度任务时按需加载完整实体档案。",
  ],

  "progressive-context-injection": [
    "传统 RAG 的核心问题是「一次性检索」——在生成前做一次向量搜索，把相关文档塞进 prompt，然后祈祷模型能正确使用这些信息。这在简单的 QA 场景下有效，但对于需要多步推理的 Agent 任务，这种模式完全不够。Agent 在执行过程中会不断遇到新的信息需求，而这些需求在任务开始时根本无法预测。",

    "Claude Code 的实现给了我最大的启发。它采用了一种「预加载最小核心 + 工具按需探索」的 hybrid model：Session 启动时只注入 CLAUDE.md（项目级指令文件），这个文件通常不超过 2KB，包含项目结构、编码规范和关键约定。之后的所有信息获取都通过工具调用完成——需要读文件就调 read tool，需要搜索就用 grep，需要理解依赖就看 package.json。这种模式让 Agent 像一个新入职的工程师：先读 README 了解全局，再按需深入具体代码。",

    "我在 OpenClaw 中实践了同样的思路，效果显著。Session 启动注入的 token 从 55K 降到 12.7K（-77%），但 Agent 的任务完成质量反而提升了。原因很直觉：减少预加载意味着更多的上下文窗口留给当前任务的实际信息。关键是要设计好「注入什么」和「什么时候注入」——AGENTS.md 定义身份和规则，TOOLS.md 索引可用能力，memory/ 目录按需读取。每个文件都有明确的读取路径和时机。",

    "但这种模式也有明显的局限。首先是工具调用的延迟：每次按需获取信息都意味着一次 API 调用，在多步推理中这些延迟会累积。其次是「不知道自己不知道什么」的问题——Agent 可能根本不会去查询某个关键信息，因为它不知道那个信息存在。这就是为什么 CLAUDE.md 式的预加载仍然不可或缺：它扮演的是一个「元信息地图」的角色，告诉 Agent 哪些信息可能存在、去哪里找。",

    "我的结论是：最佳实践不是纯预加载或纯按需获取，而是设计一个精心策划的「信息导航图」。预加载用来建立全局意识（你是谁、你能做什么、信息在哪里），按需获取用来处理具体任务。两者的比例取决于任务的可预测性——高度结构化的任务可以多预加载，探索性任务应该少预加载多探索。",
  ],

  "workflow-to-agent-mcp": [
    "2024 年底到 2025 年初，我们团队在 Dify 平台上构建了一套内容生产 workflow：用户输入一个主题，系统按预设流程依次调用搜索、提纲生成、内容撰写、SEO 优化四个节点，最终输出一篇结构化文章。这套系统在 demo 时表现完美，但上线两周后我就知道它会失败。",

    "Workflow 的根本问题是确定性假设：它假设每个任务都能被分解为固定的步骤序列，每个步骤的输入输出都是可预测的。但现实中的内容生产从来不是线性的——一个搜索结果可能改变整个选题方向，一段初稿的质量可能需要回退到提纲阶段重新调整。Workflow 无法处理这种动态性，除非你为每一种可能的分支都预先建模，而这会让 workflow 的复杂度指数级增长。",

    "转折点是 Anthropic 发布 MCP（Model Context Protocol）。MCP 做了一件非常聪明的事：它不规定 Agent 应该怎么做，只标准化了 Agent 可以用什么。工具定义、资源访问、prompt 模板——所有这些都通过统一的协议暴露给模型。Agent 可以自主决定何时调用哪个工具、用什么顺序、在什么条件下回退。这从根本上解决了 workflow 的「预定义路径」问题。",

    "我们用 MCP 重构了整个内容生产系统。原来 Dify 中的 4 个固定节点变成了 12 个 MCP 工具，Agent 可以自由组合调用。实际运行数据显示：Agent 完成一个任务平均使用 6-8 个工具调用（不是固定的 4 个），其中约 30% 的调用是 workflow 模式下根本不会发生的——比如在撰写阶段主动回去做补充搜索，或在 SEO 优化时发现需要重写某个段落。任务完成质量提升了约 40%（人工评审），而系统维护成本降低了 60%（不再需要维护复杂的分支逻辑）。",

    "当然，Auto Agent 不是万能的。对于高度标准化、合规性要求严格的任务（比如金融报告生成），确定性 workflow 仍然是更好的选择——你需要保证每一步都可审计、可复现。我们的经验是：Workflow 适合「已知最优路径」的任务，Agent 适合「需要探索最优路径」的任务。大多数真实业务场景是两者的混合——用 workflow 保证基本流程的合规性，在关键创意节点上释放 Agent 的自主性。",
  ],

  "language-shapes-llm-reasoning": [
    "这篇笔记源于一个意外发现：在调试 OpenClaw 的多语言 prompt 时，我注意到同一个逻辑推理任务，用中文 prompt 和英文 prompt 的准确率差异可以超过 15 个百分点。最初我以为这只是训练数据分布不均的结果——毕竟英文语料在预训练中占绝对多数。但深入研究后发现，事情远没有这么简单。",

    "Wendler 等人 2024 年在 EMNLP 发表的研究揭示了一个关键现象：多语言 Transformer 模型在中间层形成了一种「潜在语言」（latent language），它既不是英语也不是输入语言，而是一种抽象的内部表征。模型接收中文输入后，会在前几层将其映射到这个潜在空间，完成推理后再在最后几层映射回中文输出。这意味着语言不仅影响输入输出的表面形式，还会影响模型如何「进入」推理状态。",

    "中文 prompt 的特殊性在于它的信息密度。中文天然是「高压缩」语言——同样的语义用中文表达通常比英文短 30-40%。这在 token 层面意味着同样的上下文窗口可以装下更多信息。但硬币的另一面是：中文的省略和隐含表达也更多，模型需要更强的语用推理能力来补全省略的信息。在需要精确逻辑推理的任务（如数学证明、代码调试）中，英文的显式语法结构往往表现更好。",

    "实际工程中的启示是：不要用单一语言写所有 prompt。我在 OpenClaw 中采用的策略是「语言分工」——系统级指令（safety rules、tool definitions）用英文（更精确、歧义更少）；面向用户的对话和创意任务用中文（更自然、信息密度更高）；推理密集型 prompt（比如 deep-think 脚本的思考链引导）用英文主体 + 中文关键术语的混合模式。这种混合策略在实践中比纯中文或纯英文都表现更好。",

    "Sapir-Whorf 假说在 LLM 时代获得了一个有趣的新诠释：语言不仅塑造人类的思维方式，也塑造了模型的推理路径。但与人类不同，模型可以无缝切换语言——这是一个巨大的工程杠杆。理解语言对模型推理的影响机制，就像理解不同编程语言适合不同任务一样：不是哪个更好，而是哪个更适合当前场景。",
  ],

  "causal-inference-content-attribution": [
    "在蓝色光标做内容营销时，最常见的决策困境是：一篇爆款内容到底是因为选题好、标题好、发布时间好，还是纯粹运气好？传统做法是看相关性——爆款内容的共同特征是什么？但任何有数据分析经验的人都知道，相关性和因果性之间隔着一条鸿沟。比如我们发现「带数字的标题」和「高阅读量」高度相关，但这可能只是因为带数字标题的内容通常也做了更多的 SEO 优化。",

    "方法论的突破来自金融量化领域。我之前在做投资研究系统时接触了 Pearl 的因果推断框架，核心工具是 DAG（有向无环图）——用它来建模变量之间的因果关系，然后通过 do-calculus 区分「观察到 X 和 Y 相关」与「干预 X 导致 Y 变化」。把这套方法迁移到内容归因时，效果远超预期。",

    "具体做法是：首先为内容生产的关键变量建立因果图——选题热度、标题类型、内容深度、发布时间、推广渠道、作者粉丝数、平台算法周期等。然后通过历史数据拟合结构方程，识别出真正的因果路径。结果发现：在我们的场景中，内容深度对传播效果的直接因果效应几乎为零（反直觉！），但它通过「用户停留时间→平台算法加权→二次推荐」的间接路径产生了最强的因果效应。这意味着深度内容的价值不在于直接吸引读者，而在于激活平台的推荐机制。",

    "工程实现上，我们用 Microsoft 的 DoWhy 库构建了一个自动化归因管道。每周自动采集内容数据，更新因果图的参数估计，输出每个变量对 KPI 的 ATE（Average Treatment Effect）。这让内容团队从「拍脑袋选题」变成了「数据驱动选题」——不再追逐表面的相关性特征，而是精准干预因果链上最有效的节点。比如我们发现「发布时间」的因果效应被严重高估（混杂变量是「竞品发布节奏」），而「内容结构清晰度」的效应被严重低估。",

    "这个经验给我的最大启示是：因果推断不应该是数据科学家的专属工具，而应该成为每个决策者的基本素养。在 AI Agent 时代，Agent 做出的每一个决策背后都隐含着因果假设——选择调用哪个工具、用什么顺序执行、在什么条件下回退。如果 Agent 不能区分相关性和因果性，它的决策质量上限就是「在训练数据分布内做平均最优」，而无法真正理解和适应新场景。",
  ],

  "ai-introspection-boundaries": [
    "2025 年 Anthropic 发表了一篇令人不安的研究：通过 mechanistic interpretability 追踪 Claude 在回答问题时的内部计算路径，发现 Chain-of-Thought (CoT) 输出与模型的实际推理过程之间存在系统性偏差。简单来说：模型说它在「逐步思考」，但它的内部计算并不总是沿着 CoT 描述的路径进行的。",

    "这个发现的工程含义比学术意义更深远。整个 AI Agent 行业都重度依赖 CoT 作为可解释性的基石——我们让 Agent 输出思考过程，以此来审计它的决策质量、检测幻觉、甚至进行过程监督。但如果 CoT 不忠实于真实推理，那么基于 CoT 的所有监控手段都在监控一个「表演」而不是真实发生的事情。",

    "Turpin 等人在 NeurIPS 2024 的工作进一步量化了这个问题。他们设计了一系列实验，在 prompt 中植入会影响模型答案的 biased features，然后检查 CoT 是否提及这些 features。结果令人警醒：在大量案例中，模型的最终答案明显受到了 biased features 的影响，但 CoT 完全没有提到这些 features——它编造了一套看似合理但与真实推理无关的「解释」。这不是偶尔的失误，而是模型的系统性行为。",

    "作为一个 Agent 系统的构建者，这让我重新审视了 OpenClaw 的几个设计决策。第一，我不再完全信任 Agent 的自我报告——当 Agent 说「我检查了 X 然后决定 Y」时，它可能确实检查了 X，但「然后」这个因果连接可能是事后编造的。第二，我增加了外部验证机制：不仅看 Agent 说了什么，还要看它实际调用了什么工具、读取了什么文件、在什么时间点做出了什么决策。行为日志比自我叙述更可靠。",

    "这个话题最终引向一个更深的哲学问题：「自省」到底需要什么？人类也不总是能准确报告自己的推理过程（心理学上有大量研究证实这一点）。但人类至少有一种元认知能力——我们知道自己的自省可能不准确。当前的 LLM 似乎缺少这一层：它不仅不知道自己不知道什么（unknown unknowns），甚至不知道自己的自省是不可靠的。这可能是 AI Safety 需要解决的最基础、也最困难的问题之一。对于工程实践，我的态度是务实的：把 CoT 当作「有用的线索」而不是「可靠的证据」，同时投资建设独立于模型自我报告的外部审计能力。",
  ],
};
