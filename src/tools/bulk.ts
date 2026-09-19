import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerBulkTools(server: McpServer) {
  server.registerTool(
    "send_bulk_text",
    {
      description: "Send the same text message to multiple WhatsApp recipients at once",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        recipients: z.array(z.string()).describe("Array of chat IDs to send to"),
        text: z.string().describe("Message text content"),
      },
    },
    async ({ sessionId, recipients, text }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-bulk`,
        body: { messages: recipients.map((chatId) => ({ chatId, type: "text", content: { text } })) },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_bulk_image",
    {
      description: "Send the same image to multiple WhatsApp recipients at once",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        recipients: z.array(z.string()).describe("Array of chat IDs to send to"),
        url: z.string().describe("Public URL of the image"),
        caption: z.string().optional().describe("Optional caption for the image"),
      },
    },
    async ({ sessionId, recipients, url, caption }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-bulk`,
        body: {
          messages: recipients.map((chatId) => ({ chatId, type: "image", content: { image: { url }, caption } })),
        },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
