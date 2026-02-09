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
  details: string;
}

const projects: Project[] = [
  // ===== 蓝色光标（核心）=====
  {
    title: "内容宇宙 AI 平台",
    description:
      "企业级 AI 中台，1600+ 集团员工、2000+ Agent、日均 4000+ 调用",
    techStack: ["AWS Serverless", "MCP", "LLM Agent", "RAG"],
    role: "技术负责人（10人团队）",
    details:
      "从零搭建统一企业级 AI 中台（Smart Canvas），底层 AWS Serverless + MCP 协议，支持文案、数据分析、视频生成等多场景 Agent。引入 Buffer of Thoughts 推理框架做多步推理，分级记忆管理和代码沙箱解决安全合规。获 2024 集团年度 AI Native 团队奖。",
  },
  {
    title: "企业级视频 Agent 系统",
    description: "AI 驱动端到端视频制作，30 天→6 小时出片",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
    role: "技术负责人",
    details:
      "搭建 Agent pipeline：脚本生成→素材匹配→智能剪辑→审核优化，广告素材制作周期从 30 天压缩到 6 小时。用因果策略做内容效果归因，找到真正影响 ROI 的变量。产品代号 DDD。",
  },
  {
    title: "数据策略大脑 ChatBI",
    description: "自然语言驱动的企业数据分析与策略洞察平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL", "数据可视化"],
    role: "独立开发（AI辅助）",
    details:
      "面向业务团队的智能数据平台，通过自然语言对话实现数据查询、可视化和策略洞察生成。支持多数据源接入，AI 自动生成分析报告和策略建议，降低非技术人员的数据使用门槛。",
  },
  {
    title: "爆款视频逆向归因系统",
    description: "AI 分析爆款视频成功要素，指导内容策略优化",
    techStack: ["NLP", "视频分析", "因果推断", "Python"],
    role: "技术负责人",
    details:
      "对社交媒体爆款视频进行多维度逆向分析——脚本结构、视觉风格、音乐节奏、话题标签等维度拆解成功要素，用因果推断区分真正的成功因子和噪音相关，输出可执行的内容策略建议。",
  },
  {
    title: "飞鹤 KOC 视频智能审核",
    description: "AI 自动化视频内容审核与质量评分系统",
    techStack: ["Whisper", "Gemini Vision", "Python", "FastAPI"],
    role: "技术负责人",
    details:
      "为飞鹤品牌搭建 KOC 视频智能审核系统，AI 自动完成语音转文字、画面合规检测、品牌露出识别、内容质量评分，替代人工审核流程，大幅提升审核效率和一致性。",
  },
  {
    title: "雀巢 KOS 小红书 AIGC 平台",
    description: "AI 驱动的小红书内容批量生产与分发系统",
    techStack: ["Multi-Agent", "小红书 API", "AIGC", "Python"],
    role: "技术负责人",
    details:
      "为雀巢搭建 KOS（Key Opinion Sales）小红书内容 AIGC 平台，实现从选题策划、文案生成、图片制作到发布排期的全链路自动化。验证了单人管理多账号的 AI MCN 模式。",
  },
  {
    title: "AIdience 慧像",
    description: "Multi-Agents 智能受众研究平台",
    techStack: ["Multi-Agent", "NLP", "用户画像", "数据分析"],
    role: "技术负责人",
    details:
      "基于多 Agent 协作的智能受众研究平台，自动完成目标受众分析、用户画像构建、消费行为洞察、竞品受众对比等研究任务，将传统需要数周的受众研究压缩到小时级完成。",
  },
  {
    title: "太平洋保险数智化改造",
    description: "保险行业 AI + 数据中台数智化转型方案",
    techStack: ["数据中台", "AI Agent", "知识图谱", "可视化"],
    role: "技术方案负责人",
    details:
      "为太平洋保险设计并实施数智化改造方案，包括数据中台搭建、AI 辅助核保理赔、智能客服、知识图谱构建等模块，推动保险业务流程的智能化升级。",
  },
  {
    title: "Claude Code Enterprise Proxy",
    description: "企业团队 Claude Code CLI 共享服务",
    techStack: ["Node.js", "LiteLLM", "AWS Bedrock", "MongoDB"],
    role: "主导开发",
    details:
      "为企业团队搭建安全的 Claude Code CLI 共享服务。权限分级（正式员工 500 次/天，实习生 100 次/天）、用户申请-审批工作流、Web 管理后台、实时使用监控 + 成本跟踪。5 分钟一键部署。",
  },
  {
    title: "TeamAssist MCP",
    description: "MCP 协议团队协作与知识管理服务",
    techStack: ["Node.js", "TypeScript", "MCP SDK", "MongoDB"],
    role: "独立开发",
    details:
      "基于 MCP 协议的团队协作服务，6 个核心工具（任务管理 + 知识库 + 对话摘要），支持 Stdio/HTTP 双模式，三级权限管理。AI 从对话中自动提取任务和知识点，直接对接 Claude Desktop 等 MCP 客户端。",
  },
  // ===== AI 工具链 =====
  {
    title: "剪映 MCP & pyJianYingDraft",
    description: "剪映 API MCP 集成 + Python 草稿生成工具",
    techStack: ["Python", "MCP", "剪映 API", "TypeScript"],
    role: "独立开发",
    details:
      "两个互补项目：JianYingMCP 将剪映 API 封装为 MCP 服务供 AI Agent 调用，实现自动化视频剪辑；pyJianYingDraft 是轻量 Python 库，直接生成剪映草稿文件，构建全自动化视频剪辑/混剪流水线。",
  },
  {
    title: "Video Highlight Extractor",
    description: "企业级 AI 视频精彩片段自动提取，四层处理架构",
    techStack: ["Python", "OpenAI Whisper", "Gemini", "FastAPI"],
    role: "独立开发（AI辅助），24K行",
    details:
      "四层处理架构（召回→粗排→精排→业务重排），借鉴推荐系统经典架构。SemanticSegmenter 有真实中文 NLP 处理逻辑，BudgetManager 智能成本分配（$1-50 弹性预算）。成本节省 69-95%。",
  },
  {
    title: "OpenClaw AI Workflow",
    description: "个人 AI 操作系统，30+ 技能插件",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP"],
    role: "深度定制",
    details:
      "基于 OpenClaw 深度定制的个人 AI 工作操作系统。结构化记忆架构（MemBrain-Lite）、上下文隔离规则、30+ 技能编排（搜索/股票/TTS/视频总结/GitHub/飞书等），涵盖研究→开发→投资→生活管理全链路。",
  },
  // ===== 金融/数据 =====
  {
    title: "金融知识图谱 & 智能选股",
    description: "多维金融知识图谱 + 事件驱动投资推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理", "Python"],
    role: "核心开发（同花顺）",
    details:
      "搭建概念-因果-事理多维金融知识图谱，NLP 从研报中抽取事件和关系，做事件驱动投资逻辑推理。与爱丁堡大学 Jeff Pan 教授联合研究，落地金融场景的知识表示与推理框架。",
  },
  {
    title: "因果 AI 量化策略",
    description: "宏观-行业-个股多层级自动择时，实盘跑出 Alpha",
    techStack: ["因果推断", "时序分析", "Python", "量化交易"],
    role: "核心开发（同花顺）",
    details:
      "与 CMU 张坤教授团队合作，用因果图剔除伪相关因子，区分真因果和伪相关。回测和实盘均跑出显著 Alpha，验证因果 AI 在金融交易中的有效性。",
  },
  {
    title: "创业者画像模型",
    description: "数据驱动的创投决策系统，因果推断辅助投资",
    techStack: ["因果推断", "NLP", "标签体系", "Python"],
    role: "算法研究员（奇绩创坛）",
    details:
      "深度归因分析重构评估权重，NLP 长尾标签清洗和语义聚类（覆盖率 95%+），因果推断挖掘创始人背景与项目成功率的因果关系，给投委会提供量化决策支持。",
  },
  {
    title: "A股智能看板",
    description: "AI 驱动的 A 股投资分析与市场监控系统",
    techStack: ["Python", "Tushare", "LLM Agent", "数据可视化"],
    role: "独立开发",
    details:
      "集成 Tushare 行情数据、券商研报分析、热点扫描、事件雷达等功能的 A 股投资辅助系统，支持自动化市场监控和投资决策辅助。",
  },
  // ===== 其他 =====
  {
    title: "欧莱雅消费者洞察",
    description: "AI 驱动的消费者评论分析与知识图谱",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js"],
    role: "技术负责人",
    details:
      "基于 Gemini + RAG 的多维度评论分析（情感分布、核心洞察、热门话题、竞品对比），信息密度分级展示，多模态 Vision API 分析，知识图谱可视化。",
  },
];

const categories = [
  { name: "蓝色光标", emoji: "🏢", projects: projects.slice(0, 10) },
  { name: "AI 工具链", emoji: "🔧", projects: projects.slice(10, 13) },
  { name: "金融 / 数据", emoji: "📊", projects: projects.slice(13, 17) },
  { name: "其他", emoji: "🌐", projects: projects.slice(17) },
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
            Selected Work
          </h2>
        </motion.div>

        {categories.map((cat) => (
          <div key={cat.name} className="mb-16">
            <h3 className="text-lg font-medium text-[#A0A0A0] mb-6">
              {cat.emoji} {cat.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.projects.map((project, i) => (
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
                  <p className="text-xs text-[#666666] mb-4">{project.role}</p>
                  <Button
                    variant="ghost"
                    className="w-fit text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 p-0 h-auto text-sm group"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details{" "}
                    <ArrowRight
                      size={14}
                      className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="bg-[#141414] border-[#262626] text-[#EDEDED] max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-[#A0A0A0]">
                {selectedProject?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                {selectedProject?.details}
              </p>
              <div>
                <p className="text-xs text-[#666666] mb-2">技术栈</p>
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
              </div>
              <div>
                <p className="text-xs text-[#666666] mb-1">角色</p>
                <p className="text-sm text-[#EDEDED]">
                  {selectedProject?.role}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
