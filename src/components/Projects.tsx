"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  role: string;
  background: string;
  breakdown: string;
  execution: string;
  outcome: string;
}

const projects: Project[] = [
  // 0 - 内容宇宙 AI 平台
  {
    title: "内容宇宙 AI 平台",
    description:
      "企业级 AI 中台，1600+ 集团员工、2000+ Agent、日均 4000+ 调用",
    techStack: ["AWS Serverless", "MCP", "LLM Agent", "RAG"],
    role: "技术负责人（10人团队）",
    background:
      "各业务线各搞各的 AI 工具，重复造轮子，缺乏统一平台。集团 5000+ 员工对 AI 能力有强需求但无标准化入口。",
    breakdown:
      "设计统一 AI 中台架构：底层 AWS Serverless + MCP 协议，中间层 Buffer of Thoughts 推理框架 + 分级记忆管理，上层支持文案/数据分析/视频生成等多场景 Agent。",
    execution:
      "带 10 人产研团队从零搭建。引入代码沙箱解决安全合规，建立 Agent 分级审核机制。3 个月完成核心功能上线，持续迭代至今。",
    outcome:
      "1600+ 集团员工使用，2000+ Agent 运行，日均 4000+ 调用。获 2024 集团年度 AI Native 团队奖。",
  },
  // 1 - 企业级视频 Agent 系统
  {
    title: "企业级视频 Agent 系统",
    description: "腰部视频制作成本降至原来的 1/10，新模版周期从数周缩短到日内",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
    role: "技术负责人",
    background:
      "品牌腰部视频（非头部大制作）制作成本高、依赖人工，且新视频模版开发周期长，无法快速响应市场热点。",
    breakdown:
      "设计 Agent pipeline 四阶段架构：脚本生成→素材匹配→智能剪辑→审核优化。同时引入因果策略做内容效果归因，找到真正影响 ROI 的变量。",
    execution:
      "集成剪映 API、Gemini 多模态分析、自研因果归因引擎。在雀巢、飞鹤项目上验证落地，逐步替代人工流程。",
    outcome:
      "腰部视频制作成本降至原来的 1/10，新视频模版制作周期从数周缩短到日内。内容 ROI 归因准确率提升，告别靠经验选素材。",
  },
  // 2 - 数据策略大脑 ChatBI
  {
    title: "数据策略大脑 ChatBI",
    description: "自然语言驱动的企业数据分析与策略洞察平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL", "数据可视化"],
    role: "独立开发（AI辅助）",
    background:
      "业务团队频繁提数据需求，数据分析师成为瓶颈。非技术人员无法自助完成数据查询和洞察。",
    breakdown:
      "自然语言→SQL 转换 + AI 自动生成分析报告。支持多数据源接入，设计策略建议生成模块。",
    execution:
      "基于 Streamlit 快速原型，LLM 做 NL2SQL 和报告生成。接入业务数据库，建立数据字典和语义映射。",
    outcome:
      "业务团队自助分析率大幅提升，数据需求响应时间从天级降到分钟级。",
  },
  // 3 - 爆款视频逆向归因系统
  {
    title: "人源活力爆款归因",
    description: "AI 分析爆款视频成功要素，指导内容策略优化",
    techStack: ["NLP", "视频分析", "因果推断", "Python"],
    role: "技术负责人",
    background:
      "品牌花大量预算做视频内容，但不知道什么样的视频能火。内容策略靠经验和直觉，缺乏数据支撑。",
    breakdown:
      "多维度逆向分析框架：脚本结构、视觉风格、音乐节奏、话题标签等维度拆解，用因果推断区分真正的成功因子和噪音。",
    execution:
      "NLP 提取视频脚本特征，视频分析提取视觉特征，构建归因模型。对标竞品和行业爆款做交叉验证。",
    outcome:
      "输出可执行的内容策略建议，指导后续视频生产方向，提升内容命中率。",
  },
  // 4 - 飞鹤 KOC 视频智能审核
  {
    title: "飞鹤视频审稿",
    description: "AI 自动化视频内容审核与质量评分系统",
    techStack: ["Whisper", "Gemini Vision", "Python", "FastAPI"],
    role: "技术负责人",
    background:
      "飞鹤品牌有大量 KOC 产出的视频内容需要审核，人工审核效率低、标准不一致，且容易遗漏合规风险。",
    breakdown:
      "AI 审核四模块：语音转文字（Whisper）→ 画面合规检测（Gemini Vision）→ 品牌露出识别 → 内容质量评分。",
    execution:
      "搭建 FastAPI 服务，集成 Whisper + Gemini Vision，定义审核规则引擎，支持自定义审核标准配置。",
    outcome:
      "替代人工审核流程，审核效率提升数倍，标准一致性显著改善。",
  },
  // 5 - 雀巢 KOS 小红书 AIGC 平台
  {
    title: "雀巢 KOS 小红书 AIGC 平台",
    description: "AI 驱动的小红书内容批量生产与分发系统",
    techStack: ["Multi-Agent", "小红书 API", "AIGC", "Python"],
    role: "技术负责人",
    background:
      "雀巢需要在小红书上规模化运营 KOS 账号，传统人工运营单人只能管理 1-2 个账号，无法规模化。",
    breakdown:
      "全链路自动化：选题策划→文案生成→图片制作→发布排期。设计多 Agent 协作架构，每个环节由专门 Agent 负责。",
    execution:
      "接入小红书 API，集成 AIGC 图文生成，搭建内容审核和排期系统。验证 AI MCN 模式可行性。",
    outcome:
      "验证了单人管理多账号的 AI MCN 模式，内容生产效率提升 10x+。",
  },
  // 6 - AIdience 慧像
  {
    title: "AIdience 慧像",
    description: "Multi-Agents 智能受众研究平台",
    techStack: ["Multi-Agent", "NLP", "用户画像", "数据分析"],
    role: "技术负责人",
    background:
      "传统受众研究耗时数周，依赖问卷和焦点小组，成本高且样本有限。品牌需要更快更全面的受众洞察。",
    breakdown:
      "Multi-Agent 协作架构：数据采集 Agent + 画像分析 Agent + 洞察生成 Agent + 报告编写 Agent，各司其职自动协作。",
    execution:
      "整合社交媒体数据、消费行为数据、竞品数据等多维数据源，Agent 自动完成分析并生成结构化报告。",
    outcome:
      "受众研究周期从数周压缩到小时级，洞察覆盖度和深度超越传统方法。",
  },
  // 7 - 太平洋保险数智化改造
  {
    title: "太平洋保险数智化改造",
    description: "保险行业 AI + 数据中台数智化转型方案",
    techStack: ["数据中台", "AI Agent", "知识图谱", "可视化"],
    role: "技术方案负责人",
    background:
      "保险业务流程依赖大量人工操作，核保理赔效率低，客服响应慢，知识管理碎片化。",
    breakdown:
      "四模块方案：数据中台搭建 + AI 辅助核保理赔 + 智能客服 + 知识图谱构建。",
    execution:
      "数据中台整合多业务系统数据，AI 模型辅助风险评估，知识图谱构建保险领域专业知识网络。",
    outcome:
      "推动保险业务流程智能化升级，核保效率和客户服务体验显著提升。",
  },
  // 8 - Claude Code Enterprise Proxy
  {
    title: "Claude Code Enterprise Proxy",
    description: "企业团队 Claude Code CLI 共享服务",
    techStack: ["Node.js", "LiteLLM", "AWS Bedrock", "MongoDB"],
    role: "主导开发",
    background:
      "团队想用 Claude Code 但缺乏统一管理，无法控制用量和成本，也没有安全审计。",
    breakdown:
      "设计代理服务架构：CLI → Proxy → AWS Bedrock。权限分级 + 用量限制 + 审计日志 + Web 管理后台。",
    execution:
      "Node.js + LiteLLM + MongoDB 实现，5 分钟一键部署脚本，智能配置向导。",
    outcome:
      "正式员工 500 次/天、实习生 100 次/天的分级管理。团队 Claude Code 使用成本可控可追踪。",
  },
  // 9 - TeamAssist MCP
  {
    title: "TeamAssist MCP",
    description: "MCP 协议团队协作与知识管理服务",
    techStack: ["Node.js", "TypeScript", "MCP SDK", "MongoDB"],
    role: "独立开发",
    background:
      "小型团队人员流动性高，知识流失严重，任务管理分散在多个工具中。",
    breakdown:
      "基于 MCP 协议设计 6 个核心工具：任务管理 + 知识库 + 对话摘要。支持 Stdio/HTTP 双模式，三级权限。",
    execution:
      "Node.js + TypeScript 实现 MCP SDK 集成，AI 从对话中自动提取任务和知识点。",
    outcome:
      "直接对接 Claude Desktop 等 MCP 客户端，知识留存率和任务追踪效率提升。",
  },
  // 10 - 剪映 MCP & pyJianYingDraft
  {
    title: "剪映 MCP & pyJianYingDraft",
    description: "剪映 API MCP 集成 + Python 草稿生成工具",
    techStack: ["Python", "MCP", "剪映 API", "TypeScript"],
    role: "独立开发",
    background:
      "视频剪辑是 AI 视频工具链的最后一公里，但剪映缺乏 AI 可调用的标准接口。",
    breakdown:
      "两个互补方案：JianYingMCP 将剪映 API 封装为 MCP 服务；pyJianYingDraft 直接生成剪映草稿文件。",
    execution:
      "TypeScript 实现 MCP Server，Python 实现草稿生成库。两者配合构建全自动化视频流水线。",
    outcome:
      "实现 AI Agent 直接调用剪映进行自动化剪辑，构建了完整的 AI 视频工具链闭环。",
  },
  // 11 - Video Highlight Extractor
  {
    title: "Video Highlight Extractor",
    description: "企业级 AI 视频精彩片段自动提取，四层处理架构",
    techStack: ["Python", "OpenAI Whisper", "Gemini", "FastAPI"],
    role: "独立开发（AI辅助），24K行",
    background:
      "长视频中精彩片段的提取依赖人工观看，效率极低。企业客户需要自动化提取方案。",
    breakdown:
      "四层处理架构（借鉴推荐系统）：语义分割召回→Flash-Lite 粗排→Pro 深度精排→业务重排去重。BudgetManager 控制成本。",
    execution:
      "24K 行 Python 实现。SemanticSegmenter 做中文 NLP 断句和主题识别，Fail-Fast 架构 + 并行处理。",
    outcome:
      "成本节省 69-95%（vs 全量 Pro 分析）。弹性预算 $1-50 适配不同客户需求。",
  },
  // 12 - OpenClaw AI Workflow
  {
    title: "OpenClaw AI Workflow",
    description: "个人 AI 操作系统，30+ 技能插件",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP"],
    role: "深度定制",
    background:
      "日常工作涉及研究、开发、投资、生活管理等多场景，需要一个统一的 AI 工作流平台。",
    breakdown:
      "结构化记忆架构（MemBrain-Lite）+ 上下文隔离规则 + 30+ 技能编排 + 人格化设定。",
    execution:
      "基于 OpenClaw 深度定制，设计实体/上下文/时间线三层记忆索引，大数据自动 subagent 分流。",
    outcome:
      "覆盖研究→开发→投资→生活管理全链路，成为 AI-native 工作方式的完整实践。",
  },
  // 13 - 金融知识图谱 & 智能选股
  {
    title: "金融知识图谱 & 智能选股",
    description: "多维金融知识图谱 + 事件驱动投资推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理", "Python"],
    role: "核心开发（同花顺）",
    background:
      "金融市场信息分散在研报、资讯、公告中，投资者难以快速提取有价值的投资逻辑。",
    breakdown:
      "构建概念-因果-事理多维知识图谱 + 事件驱动投资推理引擎。与爱丁堡大学 Jeff Pan 教授联合研究。",
    execution:
      "NLP 从研报中抽取实体和关系，构建产业链传导图谱，实现事件到投资逻辑的自动推理。",
    outcome:
      "落地了适合金融场景的知识表示与推理框架，支撑智能选股和事件驱动投资。",
  },
  // 14 - 因果 AI 量化策略
  {
    title: "因果 AI 量化策略",
    description: "宏观-行业-个股多层级自动择时，实盘跑出 Alpha",
    techStack: ["因果推断", "时序分析", "Python", "量化交易"],
    role: "核心开发（同花顺）",
    background:
      "传统量化模型容易被相关性误导——A 和 B 同时涨不代表 A 导致 B 涨。需要区分真因果。",
    breakdown:
      "与 CMU 张坤教授团队合作，设计宏观-行业-个股多层级择时策略，用因果图剔除伪相关因子。",
    execution:
      "因果发现算法引入金融时序分析，构建因果 DAG，回测验证后上线实盘。",
    outcome:
      "回测和实盘均跑出显著 Alpha，验证了因果 AI 在金融交易中的有效性。",
  },
  // 15 - 创业者画像模型
  {
    title: "创业者画像模型",
    description: "数据驱动的创投决策系统，因果推断辅助投资",
    techStack: ["因果推断", "NLP", "标签体系", "Python"],
    role: "算法研究员（奇绩创坛）",
    background:
      "早期项目大多是非结构化信息，传统评估主观性强，漏筛率高，标签体系混乱。",
    breakdown:
      "三步走：归因分析重构评估权重 → NLP 标签清洗和语义聚类 → 因果推断挖掘成功因子。",
    execution:
      "深度分析历史审核数据，NLP 长尾标签处理，因果推断建模创始人特征与项目成功率。",
    outcome:
      "标签覆盖率 95%+，项目库检索准确率大幅提升，为投委会提供量化决策支持。",
  },
  // 16 - A股智能看板
  {
    title: "A股智能看板",
    description: "AI 驱动的 A 股投资分析与市场监控系统",
    techStack: ["Python", "Tushare", "LLM Agent", "数据可视化"],
    role: "独立开发",
    background:
      "个人投资需要实时跟踪多只股票和市场动态，手动查看效率低，容易错过机会。",
    breakdown:
      "集成行情数据 + 研报分析 + 热点扫描 + 事件雷达，LLM Agent 做智能分析和预警。",
    execution:
      "Python + Tushare API，cron 定时任务自动监控，Slack 通知推送。",
    outcome:
      "实现 A 股市场的自动化监控和智能分析，投资决策效率显著提升。",
  },
  // 17 - 欧莱雅消费者洞察
  {
    title: "欧莱雅产品洞察",
    description: "AI 驱动的消费者评论分析与知识图谱",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js"],
    role: "技术负责人",
    background:
      "欧莱雅需要从海量消费者评论中提取产品洞察，传统人工分析无法覆盖全量数据。",
    breakdown:
      "Gemini + RAG 架构：多维度评论分析（情感/洞察/话题/竞品）+ 信息密度分级 + 知识图谱可视化。",
    execution:
      "Next.js 前端 + FastAPI 后端，Gemini Vision 多模态分析，LightRAG 知识检索。",
    outcome:
      "实现消费者评论的全量自动分析，洞察深度和覆盖度超越传统抽样方法。",
  },
];

const categories = [
  { name: "AI 中台", emoji: "🎯", indices: [0, 7, 1] },
  { name: "客户交付", emoji: "🚀", indices: [2, 5, 4, 3, 17] },
  { name: "技术创新", emoji: "🔧", indices: [6, 11, 10, 13, 14, 15] },
  { name: "团队赋能", emoji: "🏗️", indices: [8, 9] },
  { name: "个人兴趣", emoji: "🎮", indices: [16, 12] },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-12">
            项目经历
          </h2>
        </motion.div>

        {categories.map((cat) => (
          <div key={cat.name} className="mb-16">
            <h3 className="text-lg font-medium text-[#A0A0A0] mb-6">
              {cat.emoji} {cat.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.indices.map((idx, i) => {
                const project = projects[idx];
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#3B82F6] hover:bg-[#1A1A1A] transition-all duration-300 flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-[#EDEDED] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#A0A0A0] mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-[#1E293B] text-[#94A3B8] border-none text-xs rounded-md px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-[#666666] mb-4">
                      {project.role}
                    </p>
                    <Button
                      variant="ghost"
                      className="w-fit text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 p-0 h-auto text-sm group"
                      onClick={() => setSelectedProject(project)}
                    >
                      查看详情{" "}
                      <ArrowRight
                        size={14}
                        className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="bg-[#141414] border-[#262626] text-[#EDEDED] max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-[#A0A0A0]">
                {selectedProject?.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* 技术栈 + 角色 */}
              <div className="flex flex-wrap gap-2">
                {selectedProject?.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[#1E293B] text-[#94A3B8] border-none text-xs rounded-md px-2 py-0.5"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-[#666666]">
                {selectedProject?.role}
              </p>

              {/* 四步叙事 */}
              <div className="space-y-4">
                <div className="border-l-2 border-[#3B82F6] pl-4">
                  <h4 className="text-sm font-semibold text-[#3B82F6] mb-1">
                    背景
                  </h4>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {selectedProject?.background}
                  </p>
                </div>
                <div className="border-l-2 border-[#8B5CF6] pl-4">
                  <h4 className="text-sm font-semibold text-[#8B5CF6] mb-1">
                    拆解
                  </h4>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {selectedProject?.breakdown}
                  </p>
                </div>
                <div className="border-l-2 border-[#22C55E] pl-4">
                  <h4 className="text-sm font-semibold text-[#22C55E] mb-1">
                    执行
                  </h4>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {selectedProject?.execution}
                  </p>
                </div>
                <div className="border-l-2 border-[#EAB308] pl-4">
                  <h4 className="text-sm font-semibold text-[#EAB308] mb-1">
                    成果
                  </h4>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    {selectedProject?.outcome}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
