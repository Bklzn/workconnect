# WorkConnect

A product catalog web app built with React and TypeScript. Add products through a multi-step dialog form with validation, browse them in a live catalog table, and get instant feedback via toast notifications.

## Live demo

Deployed to GitHub Pages: [bklzn.github.io/workconnect](https://bklzn.github.io/workconnect/)

## Features

- Multi-step "Add product" dialog form
- Form validation powered by Zod
- Duplicate SKU detection
- Live product catalog table
- Toast notifications
- Responsive UI with Tailwind CSS and shadcn/ui

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)
- [lucide-react](https://lucide.dev/) icons

## Requirements

- [Node.js](https://nodejs.org/) 22+ (Vite 8 requires `^20.19.0 || >=22.12.0`)
- npm

## Installation

```bash
git clone https://github.com/Bklzn/workconnect.git
cd workconnect
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build to `dist/`      |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Run ESLint                           |

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the project and deploys `dist/` to GitHub Pages on every push to `master`.