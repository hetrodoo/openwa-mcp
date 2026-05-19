import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerMediaTools(server: McpServer) {
  server.registerTool(
    "get_media",
    {
      description: "Download media (image, video, audio, document) from a received WhatsApp message by its message ID",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        messageId: z.string().describe("Message ID containing the media"),
      },
    },
    async ({ sessionId, messageId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/media/${messageId}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "upload_media",
    {
      description: "Upload media to OpenWA for later use in messages",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        file: z.string().describe("Public URL of the media file to upload"),
        type: z.string().describe("Media type: image, video, audio, or document"),
      },
    },
    async ({ sessionId, file, type }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/media`,
        body: { file, type },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
