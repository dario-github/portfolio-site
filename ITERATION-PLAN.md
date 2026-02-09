# Portfolio Site — 迭代优化计划

> 项目位置：~/Projects/portfolio-site
> 当前状态：MVP 已上线，基础 agent-friendly 已实现
> 目标：从 MVP 打磨成一个令人印象深刻的 AI-native 个人名片

---

## Phase 1: 视觉打磨（1-2h）

### P1.1 布局与间距修复
- [ ] Hero section 增加 min-h-screen，让首屏更有冲击力
- [ ] Section 间距统一为 py-32（128px），About 和 Projects 之间感觉太宽
- [ ] 导航栏高度微调，滚动后加一条 border-b 过渡
- [ ] Impact Numbers 卡片加微妙的 hover 效果（scale + border 色变）

### P1.2 字体与排版
- [ ] Hero 标题用 tracking-tight，字重调到 extrabold
- [ ] 中文正文行高调到 1.8（当前偏紧）
- [ ] 代码/技术栈标签用 Geist Mono
- [ ] 项目卡片标题 text-xl，一句话描述 text-sm

### P1.3 颜色与质感
- [ ] 雷达图填充色加渐变（从 #3B82F6 到 #8B5CF6 紫色过渡）
- [ ] Timeline 连接线加脉冲动画（暗示"从左到右的演进"）
- [ ] 项目卡片 hover 时加微妙的背景渐变
- [ ] 顶部 Hero 背景加 subtle grid 图案（像 Linear 官网）

### P1.4 动效优化
- [ ] whileInView 改为 once: true + amount: 0.2（更早触发）
- [ ] Impact Numbers 加数字滚动动画（从 0 递增到目标值）
- [ ] 项目卡片加 stagger 动画（依次出现，间隔 0.1s）
- [ ] 页面滚动时导航栏 logo 淡入

---

## Phase 2: Agent-Friendly 进阶（2-3h）

### P2.1 MCP Server Endpoint
- [ ] 创建 `/api/mcp` Route Handler
- [ ] 实现 5 个 tools: get_profile, get_skills, get_projects, get_project_detail, get_contact
- [ ] 数据从统一的 `data/` 目录 JSON 文件驱动（不硬编码）
- [ ] 支持 MCP 标准协议格式（SSE transport）

### P2.2 AI Chat Widget
- [ ] 页面底部浮动对话框："Ask about Dario"
- [ ] 3 个建议问题快捷入口
- [ ] 后端接 `/api/ask`（调用 LLM + 网站内容作为 context）
- [ ] 优雅的 loading 状态 + 流式输出
- [ ] 初始折叠，点击展开

### P2.3 llms-full.txt
- [ ] 创建 `/llms-full.txt`，包含完整能力评估 + 项目详情
- [ ] 在 `/llms.txt` 底部加 `Full version: /llms-full.txt`

### P2.4 Agent Headers
- [ ] Next.js middleware 注入 X-Agent-Friendly / X-LLMs-Txt / X-MCP-Endpoint headers
- [ ] `/.well-known/ai-plugin.json`（OpenAI plugin 格式，虽然可能不直接用但展示意识）

---

## Phase 3: 内容补全（1h）

### P3.1 真实信息
- [ ] 替换 email/github/linkedin 为真实链接
- [ ] 准备并上传简历 PDF（/resume.pdf）
- [ ] 为每个项目准备 1-2 张截图或架构图
- [ ] OG image 生成（用 `@vercel/og` 或 Satori）

### P3.2 能力评估优化
- [ ] 折叠面板内容充实（从 DESIGN.md 的完整评估中提取精华）
- [ ] 每个评分维度加上关键证据（1-2 句话）
- [ ] "最终评价" 单独高亮展示

### P3.3 SEO
- [ ] sitemap.xml 自动生成
- [ ] 每个 section 加 aria-label
- [ ] og:image 设计（暗色背景 + 名字 + 一句话）

---

## Phase 4: 高级特性（可选，每个 1-2h）

### P4.1 中英切换
- [ ] next-intl 或自建 i18n（两套内容文件）
- [ ] 语言切换按钮（右上角，不显眼）

### P4.2 项目详情页
- [ ] 从 Dialog 改为独立页面（/projects/[slug]）
- [ ] 每个项目页有架构图、技术细节、demo 链接

### P4.3 博客/思考
- [ ] MDX 博客模块
- [ ] 技术文章迁移

### P4.4 访客分析
- [ ] Vercel Analytics（免费）
- [ ] 自定义事件追踪（哪个项目被点最多、Chat 使用率）

---

## 优先级总结

| 优先级 | Phase | 预估时间 | 价值 |
|--------|-------|----------|------|
| 🔴 P0 | Phase 1 (视觉打磨) | 1-2h | 从"能用"到"好看" |
| 🔴 P0 | Phase 3.1 (真实信息) | 30min | 从 demo 到真站 |
| 🟡 P1 | Phase 2.1-2.2 (MCP + Chat) | 2-3h | 差异化亮点 |
| 🟡 P1 | Phase 3.2-3.3 (内容+SEO) | 1h | 专业度 |
| 🟢 P2 | Phase 4 (高级特性) | 各1-2h | 锦上添花 |

---

*建议执行顺序：Phase 1 → Phase 3.1 → Phase 2 → Phase 3.2 → Phase 4*
*总预估：一个下午全部搞定（AI 辅助开发）*
