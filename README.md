# Tokun — JWT Debugger
Tokun (トークン) is a lightweight, interactive, and responsive JSON Web Token (JWT) debugger built with vanilla HTML, CSS, and JavaScript.

[![Licence](https://img.shields.io/badge/Licence-GPLv3-blue.svg)](LICENSE)

## Purpose
The goal of Tokun is to provide a fast, privacy-focused, and framework-free tool for JWT manipulation. It allows developers to quickly inspect and edit JWTs without relying on external services.

## Key Features
- **Real-time Sync**: Paste an encoded JWT to decode it, or edit the decoded JSON to re-encode the token.
- **Privacy-Focused**: All processing happens in the browser; no data is sent to a server.
- **Dark/Light Mode**: Respects system preferences and allows manual toggling.
- **Vanilla Tech Stack**: Zero dependencies, no frameworks, and no build step.
- **Mobile-First Design**: Fully responsive layout for all device sizes.
- **Accessibility (A11y)**: Follows WCAG standards with semantic HTML and keyboard navigation.

## Technology Stack
Tokun is built with simplicity and performance in mind:
- **HTML5**: Semantic markup and ARIA attributes.
- **CSS3**: Modern layout (Grid, Flexbox) and Custom Properties for theming.
- **Vanilla JavaScript (ES6+)**: Pure DOM manipulation and JWT logic.
- **Deno**: Used for local development tools (server, formatting, and linting).

## Project Structure
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

## Requirements to Run
### For Users
Simply open `web/index.html` in any modern web browser.

### For Developers
To use the development tools, you will need:
- [Deno](https://deno.land/)
- `make` (optional)

## Local Development
1. **Start the local server**:
   ```bash
   make serve
   ```
2. **Format source files**:
   ```bash
   make fmt
   ```
3. **Lint source files**:
   ```bash
   make lint
   ```
The server will be available at `http://localhost:8000`.

## Licence
This project is licensed under the **GNU General Public License v3 (GPL-3.0)**. See the [LICENSE](LICENSE) file for details.

## Contributing
Please refer to the [AGENTS.md](AGENTS.md) file for development standards and guidelines.
