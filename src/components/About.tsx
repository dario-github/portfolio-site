"use client";

import { motion } from "framer-motion";

const timelineNodes = [
  {
    title: "符号推理",
    subtitle: "Symbolic Reasoning",
    desc: "金融知识图谱与因果 AI 量化",
  },
  {
    title: "因果推理",
    subtitle: "Causal Reasoning",
    desc: "创投数据驱动尽调",
  },
  {
    title: "链式推理",
    subtitle: "Chain-of-Thought",
    desc: "AI 中台与 Agent 系统",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-12">
            章东丞 / Dario Zhang
          </h2>

          <div className="max-w-3xl space-y-6 text-[#A0A0A0] leading-[1.8]">
            <p>
              AI-native 技术产品人。同济大学数学系。
            </p>

            <p>
              职业主线是「计算推理」：
              <br />
              从符号推理（金融知识图谱与因果 AI 量化）→
              因果推理（创投数据驱动尽调）→
              链式推理（AI 中台与 Agent 系统）。
            </p>

            <p>
              现在做的事：带 10 人产研团队，构建企业级 AI 中台（1600+ 用户、2000+ Agent、日均 4000+ 调用），
              以及 AI 驱动的端到端内容生产体系（腰部视频制作成本大幅下降，新视频模版制作周期显著缩短）。
            </p>

            <div className="space-y-2">
              <p className="text-[#EDEDED] font-medium">核心信条：</p>
              <ul className="list-none space-y-3">
                <li className="border-l-2 border-[#3B82F6] pl-4">让 AI 在真实业务里跑起来，不做 demo</li>
                <li className="border-l-2 border-[#3B82F6] pl-4">知道要做什么 &gt; 知道怎么做 &gt; 能自己做</li>
                <li className="border-l-2 border-[#3B82F6] pl-4">如无必要，勿增实体</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Reasoning Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-[#262626] -translate-y-1/2" />

            {timelineNodes.map((node, i) => (
              <div key={node.title} className="relative flex flex-col items-center text-center flex-1 z-10">
                <div className="w-4 h-4 rounded-full bg-[#3B82F6] mb-4 ring-4 ring-[#0A0A0A]" />
                <h3 className="text-lg font-semibold text-[#EDEDED]">
                  {node.title}
                </h3>
                <p className="text-xs text-[#666666] font-[family-name:var(--font-geist-mono)] mt-1">
                  {node.subtitle}
                </p>
                <p className="text-sm text-[#A0A0A0] mt-2 max-w-[200px]">
                  {node.desc}
                </p>
                {i < timelineNodes.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-[#262626] mt-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
