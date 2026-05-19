import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerWebhookTools(server: McpServer) {
  server.registerTool(
    "list_webhooks",
    {
      description: "List all webhooks configured for a WhatsApp session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/webhooks` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "create_webhook",
    {
      description: "Create a new webhook to receive WhatsApp events at a URL",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        url: z.string().describe("Webhook endpoint URL"),
        events: z.array(z.string()).describe("Array of event types to subscribe to"),
        secret: z.string().optional().describe("Optional webhook signing secret"),
      },
    },
    async ({ sessionId, url, events, secret }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/webhooks`,
        body: { url, events, secret },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "delete_webhook",
    {
      description: "Delete a webhook from a WhatsApp session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        webhookId: z.string().describe("Webhook ID to delete"),
      },
    },
    async ({ sessionId, webhookId }) => {
      const data = await openwaClient({
        method: "DELETE",
        path: `/sessions/${sessionId}/webhooks/${webhookId}`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "update_webhook",
    {
      description: "Update an existing webhook configuration",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        webhookId: z.string().describe("Webhook ID to update"),
        url: z.string().optional().describe("New webhook endpoint URL"),
        events: z.array(z.string()).optional().describe("Updated event types"),
        secret: z.string().optional().describe("Updated signing secret"),
      },
    },
    async ({ sessionId, webhookId, url, events, secret }) => {
      const data = await openwaClient({
        method: "PUT",
        path: `/sessions/${sessionId}/webhooks/${webhookId}`,
        body: { url, events, secret },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
