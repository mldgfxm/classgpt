# ClassGPT

面向培训机构和家教老师的 AI 课后反馈生成工具。填写学生信息和课堂表现标签，30 秒生成专业、真实的家长沟通反馈。

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router, Edge Runtime) |
| UI 库 | shadcn/ui + Radix UI + Lucide 图标 |
| 样式 | Tailwind CSS v4 + CSS 变量主题 |
| 表单 | React Hook Form + Zod v4 校验 |
| AI | Vercel AI SDK + DeepSeek/OpenAI 兼容 API，SSE 流式生成 |
| 数据库 | SQLite (本地) / Turso (生产) + Drizzle ORM |
| 状态管理 | Zustand (历史记录) |
| 部署 | Cloudflare Workers + OpenNext |

## 功能特性

- 🤖 AI 驱动的课后反馈生成（流式输出）
- 📊 7 个评估维度的标签选择
- 📝 可编辑的生成结果
- 📋 一键复制 / 导出 Word
- 💾 历史记录管理
- 📱 响应式设计（桌面三栏 / 移动端 Tab）

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 环境变量

创建 `.env.local` 文件：

```env
# AI API 配置
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-chat

# Turso 数据库（生产环境）
TURSO_DATABASE_URL=your_turso_url
TURSO_AUTH_TOKEN=your_turso_token
```

## 部署到 Cloudflare Workers

本项目的生产部署方式是 **Cloudflare Workers + OpenNext**。不要使用传统 Cloudflare Pages Git 集成部署，也不要把 `npm run dev` 当作生产运行方式。

```bash
# 检查
npm run lint

# 构建 OpenNext Worker
npm run pages:build

# 部署到 Cloudflare Workers
npm run pages:deploy
```

当前生产地址：

```txt
https://classgpt.mldgfxm.workers.dev
```

详细部署 Runbook 见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

### 生产环境变量

生产密钥使用 Cloudflare Worker secrets 配置：

| 变量名 | 说明 | 当前要求 |
|--------|------|
| `OPENAI_API_KEY` | AI API 密钥 | 必需 |
| `OPENAI_BASE_URL` | API 基础 URL | 必需 |
| `AI_MODEL` | 模型名称 | 必需 |
| `TURSO_DATABASE_URL` | Turso 数据库 URL | 历史记录生产可用时必需 |
| `TURSO_AUTH_TOKEN` | Turso 认证 Token | 历史记录生产可用时必需 |

查看已配置 secret：

```bash
npx wrangler secret list
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── generate/      # AI 生成接口
│   │   └── history/       # 历史记录 CRUD
│   ├── globals.css        # 全局样式 + 主题
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/
│   ├── feedback/          # 反馈相关组件
│   ├── forms/             # 表单组件
│   ├── history/           # 历史记录组件
│   ├── layout/            # 布局组件
│   ├── panels/            # 面板组件
│   └── ui/                # shadcn/ui 组件
├── lib/
│   ├── constants.ts       # 常量定义
│   ├── db.ts              # 数据库连接
│   └── utils.ts           # 工具函数
├── modules/
│   └── feedback/          # 反馈模块 (schema, prompt)
└── stores/                # Zustand 状态管理
```

## License

MIT
