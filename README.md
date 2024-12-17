<div align="center">
  <img width="130" src="https://github.com/BlackishGreen33/PenPal/blob/main/public/assets/images/logo.png" alt="PenPal Logo">
  <h1 align="center">PenPal</h1>
  <h3>Intelligent Collaboration, Writing the Future</h3>
  <a href="https://github.com/BlackishGreen33/PenPal"><strong>Explore Project Documentation »</strong></a>
  <br />
  <br />

![license](https://img.shields.io/github/license/BlackishGreen33/PenPal)
![language](https://img.shields.io/github/languages/top/BlackishGreen33/PenPal)
![last](https://img.shields.io/github/last-commit/BlackishGreen33/PenPal)

<a href="https://penpal-livedocs.vercel.app/" target="_blank">Live Experience</a>
·
<a href="https://github.com/BlackishGreen33/PenPal/issues">Report a Bug</a>
·
<a href="https://github.com/BlackishGreen33/PenPal/issues">Request a Feature</a>

</div>

## 🔖 Project Overview

[中文文檔](./README-zh.md) | [README in English](./README.md)

### ✨ Existing Features

- Create custom team workspaces
- Team member invitation and permission management (including `Owner`, `Administrator`, and `General Member`)
- Create projects and assign tasks
- Task flow and task management panel
- Build a team document library and real-time collaborative editing
- Use existing documents and AI intelligent retrieval Q&A in the document library
- Point system and comment system

### ✒️ Technologies Used

- **Development Framework**: [Next.js](https://nextjs.org/)
- **Frontend Framework**: [React](https://react.dev/)
- **Styling Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) & [zustand](https://zustand-demo.pmnd.rs/)
- **Text Editing**: [liveblocks](https://liveblocks.io/) & [Tiptap](https://tiptap.dev/)
- **Backend Framework**: [Hono](https://hono.dev/)
- **Primary Database**: [Appwrite](https://appwrite.io/)
- **File Storage**: [uploadthing](https://uploadthing.com/)
- **Key-Value Database**: [upstash](https://upstash.com/)
- **Vector Database**: [upstash](https://upstash.com/)
- **Comment System**: [giscus](https://giscus.app/)

### 📋 Commit Conventions

- 🎉 init: Project initialization
- ✨ feat: New features (feature)
- 🐞 fix: Bug fixes
- 📃 docs: Documentation changes
- 🌈 style: Code style changes, no logic changes
- ✅ test: Test-related changes
- 🔨 refactor: Code refactoring
- 🔧 chore: Changes in build processes or auxiliary tools

### 🎯 Compatible Environments

- Modern browsers (Chrome >= 64, Edge >= 79, Firefox >= 78, Safari >= 12)
- Project build environment (Node.js >= 18)

### 💻 Local Debugging

Remember to configure environment variables first:

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

Pull the code and switch to the project directory:

```bash
$ git clone https://github.com/BlackishGreen33/PenPal.git
$ cd PenPal
```

Install dependencies:

```bash
$ bun install
$ bun run dev
```

Start your debugging journey!

```bash
$ bun run dev
```

### 📝 Licensing

All the above files are licensed under the MIT License.

> For detailed licensing, please refer to the [LICENSE](LICENSE) file.
