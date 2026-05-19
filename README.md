# 🟢 OpenWA MCP Server

<p align="center">
  <a href="https://github.com/rmyndharis/OPENWA"><img src="https://img.shields.io/badge/OpenWA_API-Integration-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="OpenWA Integration"></a>
  <img src="https://img.shields.io/badge/MCP_Tools-44-blue?style=for-the-badge&logo=android" alt="44 MCP Tools">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.x">
  <img src="https://img.shields.io/badge/Node.js-22%2B-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 22+">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License MIT">
</p>

An enterprise-grade Model Context Protocol (MCP) server that seamlessly wraps the powerful [OpenWA](https://github.com/rmyndharis/OPENWA) WhatsApp REST API. It exposes **44 robust tools** over standard I/O (stdio) transport, enabling any MCP-compatible AI assistant (such as Cursor, Claude Desktop, Cline, and Antigravity) to securely manage WhatsApp sessions, dispatch multi-format messages, control group participants, search contacts, manage tag labels, and setup callbacks in real-time.

---

## 🧱 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│             1. AI CLIENT (Cursor, Claude, Cline, etc.)          │
│  User: "Send a promotional flyer to my active VIP groups..."    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ [JSON-RPC over stdio]
┌─────────────────────────────────────────────────────────────────┐
│                 2. OPENWA MCP SERVER (TypeScript)               │
│  • Matches user request to the `send_image` tool schema         │
│  • Validates payload boundaries using declarative Zod schemas    │
│  • Authenticates securely via local dotenv environment configs   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ [REST API Request with X-API-Key]
┌─────────────────────────────────────────────────────────────────┐
│                 3. OPENWA WHATSAPP REST DAEMON                  │
│  • Translates API payloads into native WhatsApp Web calls       │
│  • Manages multi-session state machines & SQLite indexes        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼ [WhatsApp Network Protocol]
┌─────────────────────────────────────────────────────────────────┐
│                     4. TARGET WHATSAPP DEVICES                  │
│  • Bulk promotional flyers delivered safely and instantly       │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **44 Built-in Tools**: Comprehensive control over the entire WhatsApp ecosystem.
- **Robust Zod Validation**: Pure, declarative parameter validation on every request.
- **Zero-Poll Webhooks**: Simple callbacks to receive instant WhatsApp events directly.
- **Multi-Session Native Engine**: Manage multiple phone accounts under a single server wrapper.
- **Strict Separation of Concerns**: Highly modular, human-written TypeScript architecture.

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js**: `v22.0.0` or higher
- **TypeScript**: `v5.0.0` or higher
- A running and accessible **OpenWA** REST API instance
- A secure **API Key** generated from your OpenWA server configuration

### 1. Clone & Build

```bash
# Clone the repository
git clone https://github.com/ExoCubeYT/openwa-mcp.git
cd openwa-mcp

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### 2. Configure Environment

Edit your local `.env` file to match your active OpenWA REST API backend:

```env
OPENWA_BASE_URL=http://localhost:2785/api
OPENWA_API_KEY=your_secure_api_key_here
```

### 3. Build Production Targets

```bash
npm run build
```

The production output will compile cleanly into the `dist/index.js` bundle directory.

---

## 🚀 AI Agent Integrations

To load the OpenWA MCP server into your favorite developer environment, reference the standard JSON-RPC launch config.

> **Note:** Replace `C:/path/to/openwa-mcp` with the absolute local filesystem path of your cloned workspace directory.

### Claude Desktop

Edit your global configuration file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "openwa": {
      "command": "node",
      "args": ["C:/path/to/openwa-mcp/dist/index.js"],
      "env": {
        "OPENWA_BASE_URL": "http://localhost:2785/api",
        "OPENWA_API_KEY": "your_secure_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root (or set globally via Settings > Features > MCP):

```json
{
  "mcpServers": {
    "openwa": {
      "command": "node",
      "args": ["C:/path/to/openwa-mcp/dist/index.js"],
      "env": {
        "OPENWA_BASE_URL": "http://localhost:2785/api",
        "OPENWA_API_KEY": "your_secure_api_key_here"
      }
    }
  }
}
```

### Cline (VS Code Extension)

Edit your global extension state configurations in `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "openwa": {
      "command": "node",
      "args": ["C:/path/to/openwa-mcp/dist/index.js"],
      "env": {
        "OPENWA_BASE_URL": "http://localhost:2785/api",
        "OPENWA_API_KEY": "your_secure_api_key_here"
      },
      "disabled": false
    }
  }
}
```

### Claude Code

Add `.mcp.json` to your project workspace root:

```json
{
  "mcpServers": {
    "openwa": {
      "command": "node",
      "args": ["C:/path/to/openwa-mcp/dist/index.js"],
      "env": {
        "OPENWA_BASE_URL": "http://localhost:2785/api",
        "OPENWA_API_KEY": "your_secure_api_key_here"
      }
    }
  }
}
```

### VS Code (Copilot / Continue / Open Code)

Create `.vscode/mcp.json` inside your local workspace:

```json
{
  "servers": {
    "openwa": {
      "command": "node",
      "args": ["C:/path/to/openwa-mcp/dist/index.js"],
      "env": {
        "OPENWA_BASE_URL": "http://localhost:2785/api",
        "OPENWA_API_KEY": "your_secure_api_key_here"
      }
    }
  }
}
```

---

## 🧰 WhatsApp Tool Catalog (44 Total)

All tool schemas are structured logically using modular TypeScript domains under `src/tools/`.

### 📱 Sessions & Authentication (7)
| Tool | Params | Description |
|---|---|---|
| `get_sessions` | None | Lists all active WhatsApp web browser sessions |
| `create_session` | `sessionKey` | Launches a new browser instance for authentication |
| `start_session` | `sessionKey` | Resumes a stopped session container |
| `stop_session` | `sessionKey` | Safely shuts down a running browser instance |
| `delete_session` | `sessionKey` | Wipes the credentials and directory of a session |
| `get_session_qr` | `sessionKey` | Generates a base64 pairing QR code for WhatsApp link |
| `get_session_status` | `sessionKey` | Returns `CONNECTED`, `STARTING`, or `DISCONNECTED` |

### 💬 Messaging Services (8)
| Tool | Params | Description |
|---|---|---|
| `send_text` | `chatId`, `text` | Dispatches a plaintext message to a contact/group |
| `send_image` | `chatId`, `url`, `caption` | Fetches and sends an image from a URL |
| `send_file` | `chatId`, `url`, `fileName` | Sends document files (PDFs, docs) from a URL |
| `send_audio` | `chatId`, `url` | Sends audio file streams directly to a target chat |
| `send_video` | `chatId`, `url`, `caption` | Sends high-definition videos from web URLs |
| `react_to_message` | `messageId`, `emoji` | Attaches a quick emoji reaction to a message |
| `get_messages` | `chatId`, `count` | Retrieves historical context and message logs |
| `delete_message` | `messageId` | Deletes/revokes a message for everyone |

### 🚀 Bulk Campaigns (2)
| Tool | Params | Description |
|---|---|---|
| `send_bulk_text` | `chatIds`, `text` | Delivers text announcements to target chats |
| `send_bulk_image` | `chatIds`, `url`, `caption` | Broadcasts promotional flyers to multiple contacts |

### 👥 Group Orchestration (10)
| Tool | Params | Description |
|---|---|---|
| `get_groups` | None | Returns a list of all groups the session is in |
| `create_group` | `name`, `participants` | Provisions a new group with custom contacts |
| `get_group_info` | `chatId` | Resolves admins, descriptions, and metadata |
| `add_group_member` | `chatId`, `participant` | Adds a contact to an existing group |
| `remove_group_member` | `chatId`, `participant` | Removes/kicks a participant from the group |
| `promote_member` | `chatId`, `participant` | Grants admin permissions to a participant |
| `demote_member` | `chatId`, `participant` | Strips admin privileges from a group manager |
| `send_group_message` | `chatId`, `text` | Targeted message relay for group channels |
| `leave_group` | `chatId` | Exits the specified group safely |
| `update_group_subject` | `chatId`, `subject` | Renames the group conversation title |

### 📇 Contact Management (6)
| Tool | Params | Description |
|---|---|---|
| `get_contacts` | None | Lists all saved contacts and known numbers |
| `get_contact` | `contactId` | Returns metadata, status, and profile information |
| `check_number` | `phone` | Verifies if a raw phone number is on WhatsApp |
| `get_profile_picture` | `contactId` | Resolves high-resolution avatar display URLs |
| `block_contact` | `contactId` | Instantly blocks incoming chats from a number |
| `unblock_contact` | `contactId` | Restores normal chat capabilities to a number |

### 🔔 Webhook Configs (4)
| Tool | Params | Description |
|---|---|---|
| `list_webhooks` | None | Lists active callback URLs configured for events |
| `create_webhook` | `url`, `events` | Subscribes a server URL to WhatsApp events |
| `delete_webhook` | `webhookId` | Removes an active event callback listener |
| `update_webhook` | `webhookId`, `events` | Mutates subscribed events on an active webhook |

### 🏷️ Chat Labels (5)
| Tool | Params | Description |
|---|---|---|
| `get_labels` | None | Fetches all custom label classifications |
| `create_label` | `name`, `color` | Creates a new colored tag label |
| `delete_label` | `labelId` | Removes a custom label classification |
| `add_label_to_chat` | `chatId`, `labelId` | Adds a label classification to a chat thread |
| `remove_label_from_chat` | `chatId`, `labelId` | Removes a label classification from a chat thread |

### 📦 Media Assets (2)
| Tool | Params | Description |
|---|---|---|
| `get_media` | `messageId` | Downloads media files stored inside a message |
| `upload_media` | `fileContentBase64` | Caches media on the server to prevent redelivery |

---

## 🛠️ Local Development

To run the codebase in live-refresh watch mode during extensions, run:

```bash
# Spawns tsx to track active source code files directly
npm run dev
```

To run standard test transport handshakes, build the module and execute the diagnostic listener:

```bash
npm run build
node dist/index.js
```

---

## 🤝 Contributing

We welcome contributions of all shapes and sizes! To keep codebases pristine and secure, please adhere to our strict project design conventions.

### Step-by-Step Contribution Flow

1. **Fork the Repository**: Set up your workspace branch on GitHub.
2. **Implement Your Logic**: Maintain strict separation of concerns. Keep your tools and clients isolated.
3. **No AI Comments**: Adhere to our zero AI-style commenting standard. Use short, human-like annotations where needed, and document details in `.explanation` files only.
4. **Build & Test**: Ensure `npm run build` generates zero TypeScript errors.
5. **Create a Pull Request**: Submit your pull request for review against our development branch.

See [CONTRIBUTING.md](CONTRIBUTING.md) for deeper details on our design paradigms.

---

## 📄 License

Distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
