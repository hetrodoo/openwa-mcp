import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSessionTools } from "./tools/sessions.js";
import { registerMessageTools } from "./tools/messages.js";
import { registerBulkTools } from "./tools/bulk.js";
import { registerGroupTools } from "./tools/groups.js";
import { registerContactTools } from "./tools/contacts.js";
import { registerWebhookTools } from "./tools/webhooks.js";
import { registerLabelTools } from "./tools/labels.js";
import { registerMediaTools } from "./tools/media.js";

const server = new McpServer({ name: "openwa-mcp", version: "1.0.0" });

registerSessionTools(server);
registerMessageTools(server);
registerBulkTools(server);
registerGroupTools(server);
registerContactTools(server);
registerWebhookTools(server);
registerLabelTools(server);
registerMediaTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("openwa-mcp running");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
