# Agent Guidelines: Tokun (JWT Debugger Project)

## Project Overview

Tokun is a lightweight, interactive, and responsive JSON Web Token (JWT) debugger
built with vanilla HTML, CSS, and JavaScript. The project allows
users to paste a JWT into one textarea and see the decoded JSON (Header,
Payload, Signature) in another. Users can edit the decoded JSON, and the changes
are reflected in real-time in the encoded token textarea. The goal is to provide
a fast, privacy-focused, and framework-free tool for JWT manipulation.

## Tech Stack

### Core Technologies (Mandatory)

- **HTML5**: Semantic markup, native form validation, and ARIA attributes for
  accessibility.
- **CSS3**: Modern layout (Grid, Flexbox) and Custom Properties for theming.
- **Vanilla JavaScript (ES6+)**: Pure DOM manipulation, no external frameworks
  or libraries.
- **Deno**: Used for the local development server, code formatting, and linting.
- **Makefile**: Task runner for common operations (`serve`, `format`, `lint`).

### Prohibited Technologies

- ❌ **React, Vue, Angular, or any JS frameworks**: Keep it framework-free.
- ❌ **Tailwind CSS, Bootstrap, or heavy CSS frameworks**: Use native CSS or a
  minimal classless framework (e.g., Pico CSS).
- ❌ **TypeScript**: Use vanilla JavaScript for simplicity and zero build step.
- ❌ **Build tools (Webpack, Vite, etc.)**: No build process is required for
  this static site.
- ❌ **HTMX**: Not suitable for this static-site project.

## Core Architecture

The project follows a simple static-site structure focused on performance and
maintainability:

```text
tokun/
├── web/                   # Website source files
│   ├── index.html         # Main entry point (UI structure)
│   ├── css/
│   │   ├── variables.css  # Global CSS variables (colours, spacing)
│   │   └── styles.css     # Main layout and component styling
│   ├── js/
│   │   ├── jwt.js         # Core JWT encoding/decoding logic
│   │   ├── theme.js       # Dark/Light mode logic (localStorage persisted)
│   │   └── utils.js       # Reusable helpers (base64url, toast, clipboard)
│   └── assets/
│       └── tokun.png      # Visual assets (logo, favicon)
├── AGENTS.md              # Project guidelines for AI agents
├── LICENSE                # Licence information
├── Makefile               # Task automation
├── README.md              # Documentation for developers
└── serve.ts               # Deno development server
```

### Module Responsibilities

- **`jwt.js`**: Pure functions for decoding and encoding JWTs (Header, Payload,
  Signature). Handles real-time synchronization between the encoded token and
  the decoded JSON components.
- **`theme.js`**: Manages dark/light mode persistence and system preference
  detection.
- **`utils.js`**: Provides UI-agnostic helpers like `base64urlEncode`,
  `base64urlDecode`, `showToast`, and `copyToClipboard`.

## Coding Standards

### Naming Conventions

- **HTML**: Use `kebab-case` for IDs and class names (e.g., `encoded-token`,
  `payload-editor`).
- **JavaScript**:
  - Use `camelCase` for variables, functions, and constants (e.g.,
    `handleTokenChange`, `decodedHeader`).
  - Use descriptive names that reflect purpose (e.g., `payloadTextArea` vs
    `ta1`).
- **CSS**: Use BEM or simple semantic class naming (e.g., `editor-container`,
  `theme-toggle`).

### General Patterns

- **Functional Approach**: Prefer pure functions for encoding/decoding; separate
  logic from DOM manipulation.
- **British English**: Use British English spelling (e.g., `colour`,
  `optimised`, `centre`) for both code comments and user-facing text.
- **No Build Step**: Do not add build tools or transpilers. The code must run
  directly in modern browsers.
- **Progressive Enhancement**: Ensure core functionality works without
  JavaScript; enhance with JS.

### Performance & Accessibility

- **Target Metrics**: Total page size < 100KB, FCP < 1.5s, TTI < 2.5s.
- **Accessibility**: Follow WCAG AA standards, ensuring high contrast, ARIA
  labels, and full keyboard navigation.
- **Manual Verification**: Test across mobile (< 768px), tablet (768px -
  1024px), and desktop (> 1024px).

## Agent Constraints

### Dos

- ✅ **Use semantic HTML5**: Always use `<main>`, `<section>`, `<form>`,
  `<label>`, etc.
- ✅ **Mobile-first CSS**: Use Grid and Flexbox for responsive layouts.
- ✅ **Real-time Sync**: Ensure changes in encoded token reflect in decoded
  editors and vice-versa.
- ✅ **JSDoc**: Add JSDoc comments for complex functions or non-obvious logic.
- ✅ **Error Handling**: Gracefully handle invalid JWT formats and show
  user-friendly error messages.

### Don'ts

- ❌ **No Frameworks**: Do not introduce any external JS or CSS frameworks.
- ❌ **No innerHTML**: Use `textContent` or `value` for displaying/editing data
  to prevent XSS.
- ❌ **No npm/Node**: Avoid `package.json` or `node_modules`. Stick to Deno for
  dev tasks.
- ❌ **No Absolute Paths**: Use relative paths for all internal assets and
  scripts.
- ❌ **No !important**: Avoid `!important` in CSS; use proper specificity.

## Version History

- **v1.0** (2026-03-05) - Initial guidelines established for the Tokun JWT
  debugger project.

---

**Last Updated:** 2026-03-05\
**Document Owner:** Project Team\
**Review Frequency:** As needed based on project evolution
