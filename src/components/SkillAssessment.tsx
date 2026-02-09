"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const data = [
  { subject: "AI工具驾驭", score: 90 },
  { subject: "产品思维", score: 85 },
  { subject: "独立交付", score: 85 },
  { subject: "架构设计", score: 80 },
  { subject: "数据分析", score: 80 },
  { subject: "代码质量", score: 65 },
  { subject: "工程规范", score: 55 },
  { subject: "深度技术", score: 50 },
];

const detailedAssessment = [
  {
    dimension: "AI工具驾驭",
    grade: "A (90)",
    evidence:
      "系统化 Claude Code 工作流、20+ AI 辅助项目、OpenClaw 30+ 技能深度定制。不是简单 prompt 使用者，而是构建了完整的 AI 协作体系。",
  },
  {
    dimension: "产品思维",
    grade: "A- (85)",
    evidence:
      "PRD 写作、用户画像、路线图规划超越典型开发者水平。能从业务需求出发定义产品方向，而非纯技术驱动。",
  },
  {
    dimension: "独立交付",
    grade: "A- (85)",
    evidence:
      "多个全栈原型独立交付（AI 辅助）。Video Highlight Extractor 24K 行代码独立完成，从 0 到 1 产品化能力强。",
  },
  {
    dimension: "架构设计",
    grade: "B+ (80)",
    evidence:
      "擅长组装式架构——API 网关 + 微服务 + Agent 编排。四层架构设计清晰，但底层系统设计经验有限。",
  },
  {
    dimension: "数据分析",
    grade: "B+ (80)",
    evidence:
      "实用型数据分析，脚本驱动。Tushare 量化、创投数据挖掘、业务指标体系搭建。",
  },
  {
    dimension: "代码质量",
    grade: "B- (65)",
    evidence:
      "功能导向，AI 辅助编写为主。代码可用但缺乏极致工程品味，测试覆盖一般。",
  },
  {
    dimension: "工程规范",
    grade: "C+ (55)",
    evidence:
      "Docker 部署 ✓，CI/CD 最小化。版本管理和自动化流程有提升空间。",
  },
  {
    dimension: "深度技术",
    grade: "C (50)",
    evidence:
      "无底层算法/系统编程证据。强在应用层集成而非基础设施层。",
  },
];

export default function SkillAssessment() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="assessment" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-6">
            技术能力评估
          </h2>
          <p className="text-[#A0A0A0] max-w-2xl mb-12 leading-relaxed">
            以下为 AI 基于真实代码仓库的客观技术能力评估。评估方法：全盘扫描本地代码仓库、git log、项目结构、技术文档，只看代码和实际产出。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#141414] border border-[#262626] rounded-xl p-8"
        >
          <div className="w-full max-w-lg mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#262626" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#A0A0A0", fontSize: 12 }}
                />
                <Radar
                  name="技术能力"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="url(#skillGradient)"
                  fillOpacity={1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-8">
            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-[#EDEDED] transition-colors cursor-pointer w-full justify-center">
              <span>{isOpen ? "收起详细评估" : "展开详细评估"}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-6 space-y-6">
              <div className="bg-[#0A0A0A] rounded-lg p-6 border border-[#262626]">
                <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                  总体画像
                </h3>
                <p className="text-[#A0A0A0] leading-relaxed">
                  AI-native 技术产品人，核心竞争力在于「用 AI 快速交付产品」而非「深度技术攻坚」。
                  产品感知力和 AI 工具运用能力是显著优势，能把 AI 当成真正的生产力乘数。
                  工程基础可用但非精通，属于「能造出来且能用」的实用主义者。
                </p>
              </div>

              <div className="space-y-4">
                {detailedAssessment.map((item) => (
                  <div
                    key={item.dimension}
                    className="bg-[#0A0A0A] rounded-lg p-4 border border-[#262626]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[#EDEDED]">
                        {item.dimension}
                      </span>
                      <span className="text-sm font-[family-name:var(--font-geist-mono)] text-[#3B82F6]">
                        {item.grade}
                      </span>
                    </div>
                    <p className="text-sm text-[#A0A0A0]">{item.evidence}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0A0A0A] rounded-lg p-6 border border-[#262626]">
                <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                  最终评价
                </h3>
                <p className="text-[#A0A0A0] leading-relaxed">
                  章东丞不是传统意义上的 &quot;硬核工程师&quot;，而是一个稀缺的
                  &quot;AI-native 技术产品人&quot;。他的价值在于：理解业务需求 →
                  设计产品方案 → 用 AI 加速交付 → 持续迭代。在 AI
                  原生时代，这种「知道要做什么」+「能用 AI
                  做出来」的组合，可能比纯技术能力更有杠杆效应。
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <p className="text-center text-xs text-[#666666] mt-8 font-[family-name:var(--font-geist-mono)]">
            由 Claude 基于真实代码仓库评估
          </p>
        </motion.div>
      </div>
    </section>
  );
}
