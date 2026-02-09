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
  oneLiner: string;
  techStack: string[];
  role: string;
  details: string;
}

const projects: Project[] = [
  {
    title: "Video Highlight Extractor",
    oneLiner: "企业级 AI 视频精彩片段自动提取系统",
    techStack: ["Python", "OpenAI Whisper", "Gemini", "FastAPI", "Docker"],
    role: "独立开发（AI辅助）, 24K行",
    details:
      "四层架构设计（转录层 → 分析层 → 编辑层 → 输出层），集成 OpenAI Whisper 语音转录与 Gemini 多模态分析，自动识别视频高光时刻并生成精华剪辑。支持批量处理、自定义评分规则、多格式输出。独立完成 24,000 行 Python 代码，从 0 到 1 产品化交付。",
  },
  {
    title: "Claude Code Workflow Studio",
    oneLiner: "VS Code 插件，可视化设计 Claude Code 工作流",
    techStack: ["TypeScript", "React Flow", "VS Code API"],
    role: "贡献者",
    details:
      "VS Code 扩展，将 Claude Code 的工作流设计从命令行搬到可视化画布。基于 React Flow 构建节点编辑器，支持拖拽式工作流编排、条件分支、循环执行、变量传递。降低 AI 工作流设计门槛，让非技术用户也能构建复杂 Agent 流程。",
  },
  {
    title: "Claude Code Enterprise Proxy",
    oneLiner: "企业团队 Claude Code 共享服务",
    techStack: ["Node.js", "LiteLLM", "AWS Bedrock", "MongoDB"],
    role: "主导开发",
    details:
      "企业级 Claude Code 共享代理服务，解决团队 API 成本和管理问题。通过 LiteLLM 统一网关对接 AWS Bedrock 等多个 AI 服务商，实现用量追踪、配额管理、成本分摊。MongoDB 存储使用日志和团队配置，支持多租户隔离。将团队 AI 编码工具成本降低 60%。",
  },
  {
    title: "TeamAssist MCP",
    oneLiner: "MCP 协议团队协作与知识管理服务",
    techStack: ["Node.js", "TypeScript", "MCP SDK", "MongoDB"],
    role: "独立开发",
    details:
      "基于 Model Context Protocol (MCP) 构建的团队协作服务，让 AI Agent 能够直接访问和管理团队知识库。实现文档检索、任务分配、会议纪要生成、知识图谱查询等能力，通过标准化 MCP 接口与各类 AI 工具无缝集成。",
  },
  {
    title: "OpenClaw AI Workflow",
    oneLiner: "个人 AI 操作系统，30+ 技能插件",
    techStack: ["OpenClaw", "Claude", "Slack", "MCP"],
    role: "深度定制",
    details:
      "基于 OpenClaw 平台深度定制的个人 AI 操作系统。30+ 技能插件覆盖：股票分析（Tushare + 自定义策略）、社交媒体爬虫、深度思考（Gemini/GPT 多模型协同）、视频总结、TTS、浏览器自动化等。通过 Slack 作为统一交互界面，实现 AI 原生的工作流自动化。",
  },
  {
    title: "Business Strategy Simulation",
    oneLiner: "Venture Strategy 商业模拟经营决策",
    techStack: ["战略分析", "定价策略", "产能规划"],
    role: "团队决策者",
    details:
      "商业模拟竞赛项目，作为团队核心决策者参与 Venture Strategy 多轮竞赛。负责市场分析、定价策略制定、产能规划与资源配置。运用数据驱动决策方法，结合博弈论思维进行竞争策略优化，最终取得优异成绩。",
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
              className="bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#3B82F6] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-semibold text-[#EDEDED] mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-[#A0A0A0] mb-4 flex-1">
                {project.oneLiner}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-[#1A1A1A] text-[#A0A0A0] border-none text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-[#666666] mb-4">{project.role}</p>
              <Button
                variant="ghost"
                className="w-fit text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 p-0 h-auto text-sm"
                onClick={() => setSelectedProject(project)}
              >
                View Details <ArrowRight size={14} className="ml-1" />
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
                {selectedProject?.oneLiner}
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
                      className="bg-[#1A1A1A] text-[#A0A0A0] border-none text-xs"
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
