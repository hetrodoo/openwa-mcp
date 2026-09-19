import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaMedia } from "../client.js";

export function registerMediaTools(server: McpServer) {
  server.registerTool(
    "get_media",
    {
      description: "Download media (image, video, audio, document) from a WhatsApp message stored by OpenWA",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        chatId: z.string().describe("Chat ID containing the message"),
        messageId: z.string().describe("Message ID containing the media"),
      },
    },
    async ({ sessionId, chatId, messageId }) => {
      const { data, mimeType } = await openwaMedia(`/sessions/${sessionId}/messages/${chatId}/${messageId}/media`);
      if (mimeType.startsWith("image/")) {
        return { content: [{ type: "image" as const, data, mimeType }] };
      }
      return {
        content: [
          {
            type: "resource" as const,
            resource: { uri: `openwa://sessions/${sessionId}/messages/${messageId}/media`, mimeType, blob: data },
          },
        ],
      };
    }
  );
}
