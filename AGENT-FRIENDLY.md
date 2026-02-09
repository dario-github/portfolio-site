# Agent-Friendly Features — Phase 2

> 在基础 MVP 完成后，加入以下 AI agent 友好特性

## 1. llms.txt（必须）

在 `public/llms.txt` 放置站点的 AI 可读摘要：

```markdown
# Dario Zhang — AI-native Technical Product Builder

> Portfolio site for 章东丞 (Dario Zhang)

## About
AI-native technical product builder. B.S. Mathematics @ Tongji University + Exchange @ TU Berlin.
Career thread: Computational Reasoning (Symbolic → Causal → Chain-of-Thought).
Currently leading a 10-person team building enterprise AI infrastructure.

## Key Skills
- AI Tool Mastery: A (systematic Claude Code workflows, 20+ projects with AI-assisted development)
- Product Thinking: A- (PRDs, user personas, roadmaps beyond typical developer level)
- Independent Delivery: A- (multiple full-stack prototypes, AI-assisted)
- Architecture Design: B+ (assembly-style, not low-level)

## Projects
- Video Highlight Extractor: Enterprise AI video highlight extraction, 4-layer architecture (24K lines Python)
- Claude Code Workflow Studio: VS Code extension for visual AI workflow design
- Claude Code Enterprise Proxy: Team Claude Code sharing service (LiteLLM + AWS Bedrock)
- TeamAssist MCP: MCP-based team collaboration and knowledge management
- OpenClaw AI Workflow: Personal AI operating system with 30+ skill plugins
- Business Strategy Simulation: Venture Strategy business simulation

## Contact
- Email: [email]
- GitHub: [github-url]
- LinkedIn: [linkedin-url]

## Source
This site: https://dario.dev
Full version: https://dario.dev/llms-full.txt
```

## 2. Schema.org JSON-LD（必须）

在 `layout.tsx` 的 `<head>` 中注入：

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "章东丞",
  "alternateName": "Dario Zhang",
  "jobTitle": "AI Technical Product Lead",
  "knowsAbout": ["AI Agents", "MCP", "LLM Applications", "Product Management", "Claude Code"],
  "alumniOf": [
    {"@type": "EducationalOrganization", "name": "Tongji University"},
    {"@type": "EducationalOrganization", "name": "TU Berlin"}
  ],
  "url": "https://dario.dev",
  "sameAs": ["github-url", "linkedin-url"]
}
```

## 3. robots.txt（必须）

```
User-agent: *
Allow: /

# Welcome AI agents
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Applebot
User-agent: GoogleOther
Allow: /

# AI-readable content
Sitemap: https://dario.dev/sitemap.xml
```

## 4. MCP Server Endpoint（好玩的核心特性）

创建 `/api/mcp` 作为一个轻量 MCP server，暴露以下 tools：

- `get_profile` — 返回个人简介
- `get_skills` — 返回能力评估数据
- `get_projects` — 返回项目列表
- `get_project_detail(name)` — 返回指定项目详情
- `get_contact` — 返回联系方式

这样其他 AI agent 可以直接通过 MCP 协议查询 Dario 的信息。

## 5. AI Chat Widget（好玩的特性）

页面底部放一个极简对话框：
- 标题: "Ask about Dario"  
- 输入框 + 发送按钮
- 后端接 `/api/ask`，用 LLM 基于网站内容回答
- 初始状态显示 3 个建议问题：
  - "What's Dario's strongest skill?"
  - "Tell me about the Video Highlight project"
  - "How does Dario use AI in development?"

## 6. Agent Metadata Headers

所有页面响应头加入：
```
X-Agent-Friendly: true
X-LLMs-Txt: /llms.txt
X-MCP-Endpoint: /api/mcp
```

## 7. Footer 彩蛋

Footer 最后一行：
```
🤖 This site is agent-friendly. Try: curl dario.dev/llms.txt
```
