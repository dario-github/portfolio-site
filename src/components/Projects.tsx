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
  // === 蓝色光标（核心）===
  {
    title: "内容宇宙 AI 平台",
    description:
      "企业级 AI 中台，支撑 1600+ 集团员工、2000+ Agent、日均 4000+ 调用",
    techStack: [
      "AWS Serverless",
      "MCP",
      "LLM Agent",
      "RAG",
      "Buffer of Thoughts",
    ],
    role: "技术负责人（10人团队）",
    details:
      "从零搭建统一的企业级 AI 中台（Smart Canvas），底层走 AWS Serverless + MCP 协议，上层支持文案、数据分析、视频生成等多场景 Agent。引入 Buffer of Thoughts 推理框架做复杂任务的多步推理，用分级记忆管理和代码沙箱解决安全合规问题。获 2024 集团年度 AI Native 团队奖。",
  },
  {
    title: "企业级视频 Agent 系统",
    description: "AI 驱动端到端视频制作，从 30 天压缩到 6 小时出片",
    techStack: ["Multi-Agent", "因果策略", "剪映 API", "Gemini"],
    role: "技术负责人",
    details:
      "搭建 Agent pipeline——脚本生成、素材匹配、智能剪辑、审核优化，将广告素材从脚本到成片的周期从 30 天压缩到 6 小时。同时用因果策略做内容效果归因，找到真正影响 ROI 的变量，在雀巢、飞鹤项目上验证落地。产品代号 DDD。",
  },
  // === AI 工具链 ===
  {
    title: "OpenClaw AI Workflow",
    description: "个人 AI 操作系统，30+ 技能插件覆盖工作全链路",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP", "30+ Skills"],
    role: "深度定制",
    details:
      "基于开源项目 OpenClaw 深度定制的个人 AI 工作操作系统。设计了结构化记忆架构（MemBrain-Lite：实体/上下文/时间线索引）、上下文隔离规则（大数据自动 subagent 分流）、30+ 技能编排（搜索/股票/TTS/视频总结/GitHub/飞书等），涵盖研究→开发→投资→生活管理全链路。",
  },
  // === 金融/数据 ===
  {
    title: "金融知识图谱 & 智能选股",
    description: "多维金融知识图谱 + 事件驱动投资逻辑推理引擎",
    techStack: ["NLP", "知识图谱", "因果推理", "Python"],
    role: "核心开发（同花顺）",
    details:
      "搭建包含概念、因果、事理的多维金融知识图谱，用 NLP 从研报和资讯中抽取事件和关系，做事件驱动的投资逻辑推理引擎。与爱丁堡大学 Jeff Pan 教授（知识图谱领域）联合研究，落地了适合金融场景的知识表示与推理框架。",
  },
  {
    title: "因果 AI 量化策略",
    description: "宏观-行业-个股多层级自动择时，实盘跑出 Alpha",
    techStack: ["因果推断", "时序分析", "Python", "量化交易"],
    role: "核心开发（同花顺）",
    details:
      '与 CMU 张坤教授团队（因果发现领域）合作，研发宏观-行业-个股多层级自动择时策略。核心思路是用因果图剔除伪相关因子——区分"A 导致 B"和"A 和 B 碰巧一起动"。回测和实盘都跑出了显著 Alpha，验证了因果 AI 在金融交易中的有效性。',
  },
  {
    title: "创业者画像模型",
    description: "数据驱动的创投决策系统，因果推断辅助投资",
    techStack: ["因果推断", "NLP", "标签体系", "Python"],
    role: "算法研究员（奇绩创坛）",
    details:
      "对历史审核数据做深度归因分析，重构评估权重，降低漏筛率。用 NLP 做长尾标签清洗和语义聚类，标签覆盖率提到 95%+。引入因果推断挖掘创始人背景、赛道特征与项目成功率的因果关系，给投委会提供量化决策支持。",
  },
  {
    title: "ChatBI 智能数据平台",
    description: "自然语言驱动的企业数据分析平台",
    techStack: ["Streamlit", "Python", "LLM", "SQL"],
    role: "独立开发（AI辅助）",
    details:
      "面向业务团队的智能数据分析平台，通过自然语言对话实现数据查询、可视化和洞察生成。支持多数据源接入，AI 自动生成分析报告，降低非技术人员的数据使用门槛。",
  },
  {
    title: "A股投资 Agent",
    description: "AI 驱动的 A 股投资分析与决策辅助系统",
    techStack: ["Python", "Tushare", "LLM Agent", "量化分析"],
    role: "独立开发",
    details:
      "结合量化分析和 AI Agent 的 A 股投资辅助系统。集成 Tushare 行情数据、券商研报分析、热点扫描、事件雷达等功能，支持自动化的市场监控和投资决策辅助。",
  },
  // === 其他 ===
  {
    title: "欧莱雅 CCL 消费者洞察",
    description: "AI 驱动的消费者评论分析与知识图谱系统",
    techStack: ["Gemini", "RAG", "知识图谱", "Next.js", "FastAPI"],
    role: "技术负责人",
    details:
      "为欧莱雅搭建消费者评论分析系统，基于 Gemini + RAG 架构实现多维度评论分析（情感分布、核心洞察、热门话题、竞品对比），信息密度分级展示，多模态分析接入 Vision API，知识图谱可视化呈现消费者认知关系。",
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
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
                View Details <ArrowRight size={14} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          ))}
        </div>

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
