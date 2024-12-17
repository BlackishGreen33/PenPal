<div align="center">
  <img width="130" src="https://github.com/BlackishGreen33/PenPal/blob/main/public/assets/images/logo.png" alt="PenPal Logo">
  <h1 align="center">PenPal</h1>
  <h3>智能协作，书写未来</h3>
  <a href="https://github.com/BlackishGreen33/PenPal"><strong>探索项目文档 »</strong></a>
  <br />
  <br />

![license](https://img.shields.io/github/license/BlackishGreen33/PenPal)
![language](https://img.shields.io/github/languages/top/BlackishGreen33/PenPal)
![last](https://img.shields.io/github/last-commit/BlackishGreen33/PenPal)

<a href="https://penpal-livedocs.vercel.app/" target="_blank">在线体验</a>
·
<a href="https://github.com/BlackishGreen33/PenPal/issues">报告Bug</a>
·
<a href="https://github.com/BlackishGreen33/PenPal/issues">提出新特性</a>

</div>

## 🔖 项目导览

[中文文檔](./README-zh.md) | [README in English](./README.md)

### ✨ 現有功能

- 创建自定义团队工作空间
- 团队成员邀请与权限管理(包括 `拥有者` 、 `管理员` 与 `一般成员`)
- 创建项目并分配代办任务
- 任务流转与代办管理面板
- 构建团队文档库与实时协作编辑
- 在文档库中使用既有文档与 AI 智能检索问答
- 积分系统与评论系统

### ✒️ 引用技術

- **开发主框架**: [Next.js](https://nextjs.org/)
- **前端框架**：[React](https://react.dev/)
- **样式框架**: [Tailwind CSS](https://tailwindcss.com/)
- **组件库**：[shadcn/ui](https://ui.shadcn.com/)
- **状态管理**：[React Query](https://tanstack.com/query/latest/docs/framework/react/overview) & [zustand](https://zustand-demo.pmnd.rs/)
- **文本编辑**：[liveblocks](https://liveblocks.io/) & [Tiptap](https://tiptap.dev/)
- **后端框架**：[Hono](https://hono.dev/)
- **主数据库**：[Appwrite](https://appwrite.io/)
- **文件存储**：[uploadthing](https://uploadthing.com/)
- **键值数据库**：[upstash](https://upstash.com/)
- **向量数据库**：[upstash](https://upstash.com/)
- **评论系统**：[giscus](https://giscus.app/)

### 📋 提交规范

- 🎉 init：项目初始化
- ✨ feat：新增功能（feature）
- 🐞 fix：修复bug
- 📃 docs：文档修改
- 🌈 style：代码样式修改，不影响原代码逻辑
- ✅ test：测试相关的改动
- 🔨 refactor：代码重构
- 🔧 chore：建制过程或辅助工具的变动

### 🎯 相容环境

- 现代浏览器（Chrome >= 64, Edge >= 79, Firefox >= 78, Safari >= 12）
- 项目构建环境（Node.js >= 18）

### 💻 本地调试

记得先配置环境变量：

```env
NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=

NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
NEXT_PUBLIC_APPWRITE_TASKS_ID=
NEXT_PUBLIC_APPWRITE_USERS_ID=
NEXT_PUBLIC_APPWRITE_FILES_ID=
NEXT_PUBLIC_APPWRITE_MESSAGES_ID=
NEXT_PUBLIC_APPWRITE_SCORES_ID=
NEXT_PUBLIC_APPWRITE_DOCUMENTS_ID=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=
NEXT_PUBLIC_APPWRITE_FILES_BUCKET_ID=

NEXT_APPWRITE_KEY=

UPLOADTHING_TOKEN=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=

QSTASH_URL=
QSTASH_TOKEN=

QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=

LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=
```

拉取代码并切换到项目目录下：

```bash
$ git clone https://github.com/BlackishGreen33/PenPal.git
$ cd PenPal
```

安装依赖：

```bash
$ bun install
$ bun run dev
```

开始调试你的调试之旅！

```bash
$ bun run dev
```

### 📝 授权

上述文件皆以 MIT 许可授权

> 详细之授权请参考 [LICENSE](LICENSE) 文件
