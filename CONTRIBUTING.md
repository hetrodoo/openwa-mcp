# Contributing to OpenWA MCP Server

We're thrilled you want to contribute to the **OpenWA MCP Server**! To maintain code cleanliness, high quality, and optimal performance across all MCP tools, please follow our architectural standards and coding conventions.

---

## 🎨 Architectural Standard & Separation of Concerns

Our codebase is strictly modular. Make sure your contributions respect the boundaries of each file:

1. **`src/client.ts`**: The exclusive gateway for all direct REST API request configurations, endpoint wrappers, and auth headers (`X-API-Key`).
2. **`src/tools/`**: Domain-specific modules. Each tool MUST validate inputs using Zod parameters and delegate execution directly to the underlying OpenWA REST client. Do not bleed state management into tool definitions.
3. **`src/index.ts`**: Orchestration entry point only. Connects tools to the MCP StdioServerTransport.

---

## 💬 Commenting Policy

To keep our repository looking professional and human-built, we enforce a strict commenting policy:

- **No AI-Generated Comments**: Avoid block explanations, tutorials, or long comments that state the obvious.
- **Micro-Annotations Only**: Limit code comments to `0–5` annotations per directory. Annotations must be short and casual (e.g., `// fix later`, `// temp work`, `// wait for status`).
- **Explanation Files**: If a file requires complex algorithmic explanation, document it inside a separate `.explanation` file instead of cluttering the source code.

---

## ⚙️ How to Develop

### 1. Build and Hot-Reload
Use the following commands to run or compile your changes locally:

```bash
# Start compiling TypeScript to JS on change
npm run dev

# Run a single production-ready build
npm run build
```

### 2. Verification
Before submitting a pull request, verify that the package compiles correctly and can launch successfully:

```bash
# Run compilation
npm run build

# Start the stdio process (will sit waiting for stdin JSON-RPC messages)
npm start
```

---

## 🚀 Pull Request Checklist

Before submitting your pull request, double-check that you've done the following:

- [ ] Core module compiles with zero TypeScript errors or warnings (`tsc --noEmit` runs clean).
- [ ] No inline comments explaining basic logic.
- [ ] No mixed languages or inline configuration objects outside standard configurations.
- [ ] Added your name or handles to `LICENSE` or `README.md` contributors section if appropriate.

---

Thank you for helping us build the ultimate WhatsApp gateway for the AI agent era!
