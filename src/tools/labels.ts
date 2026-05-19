import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerLabelTools(server: McpServer) {
  server.registerTool(
    "get_labels",
    {
      description: "List all labels/tags in the WhatsApp session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/labels` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "create_label",
    {
      description: "Create a new label/tag for organizing WhatsApp chats",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        name: z.string().describe("Label name"),
        color: z.string().optional().describe("Label color hex code"),
      },
    },
    async ({ sessionId, name, color }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/labels`,
        body: { name, color },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "delete_label",
    {
      description: "Delete a label from the WhatsApp session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        labelId: z.string().describe("Label ID to delete"),
      },
    },
    async ({ sessionId, labelId }) => {
      const data = await openwaClient({
        method: "DELETE",
        path: `/sessions/${sessionId}/labels/${labelId}`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "add_label_to_chat",
    {
      description: "Apply a label to a specific WhatsApp chat",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        labelId: z.string().describe("Label ID to apply"),
        chatId: z.string().describe("Chat ID to label"),
      },
    },
    async ({ sessionId, labelId, chatId }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/labels/${labelId}/chats`,
        body: { chatId },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "remove_label_from_chat",
    {
      description: "Remove a label from a specific WhatsApp chat",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        labelId: z.string().describe("Label ID"),
        chatId: z.string().describe("Chat ID to remove the label from"),
      },
    },
    async ({ sessionId, labelId, chatId }) => {
      const data = await openwaClient({
        method: "DELETE",
        path: `/sessions/${sessionId}/labels/${labelId}/chats/${chatId}`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
