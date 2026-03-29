# Gusto Restaurant - Modern Web Application

> A full-featured restaurant web application built with modern technologies and best practices.

## Quick Start

### Installation & Development
```sh
git clone <GIT_URL>
cd gusto-restaurant
npm install
npm run dev
```

Server runs on: http://localhost:5173/gusto-restaurant/

### Production Build
```sh
npm run build
```

### Code Quality
```sh
npm run lint
```

## Live Demo

https://lbedv.github.io/gusto-restaurant/

## Technologies & Architecture

### Core Stack
- **Vite** - Lightning-fast build tool and dev server
- **React 18** - Modern UI library with hooks
- **TypeScript** - Strictly typed codebase
- **shadcn/ui** - Accessible, customizable component library
- **Tailwind CSS** - Utility-first styling

### Key Features
- **Type Safety** - Strict TypeScript configuration across the entire project
- **State Management** - React Context API for efficient cart management
- **Responsive Design** - Tailwind CSS with mobile and desktop breakpoints
- **Component Architecture** - Well-organized React components built with shadcn/ui
- **Modern Tooling** - ESLint for code quality, Vite for optimal bundling
- **UI/UX** - Professional components with proper styling

## Project Structure

```
src/
├── components/       # React components (home, layout, UI)
├── constants/        # Static data (menu items, allergens)
├── context/          # React Context for state management
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── assets/           # Images, videos, media
```

## Academic Context

Completed as a semetral project for the **Czech Technical University in Prague (CVUT FEL)** for the subject *Vývoj klientských aplikací v Javascriptu* (JavaScript Client Application Development).

## License

MIT License