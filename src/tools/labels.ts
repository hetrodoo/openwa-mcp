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
      description:
        "Create or update a label/tag for organizing WhatsApp chats (WhatsApp Business on the Baileys engine only). " +
        "Pick an unused label ID to create; an existing ID is overwritten.",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        labelId: z.string().describe("Label ID, chosen by the caller"),
        name: z.string().describe("Label name"),
        color: z.number().int().min(0).max(19).optional().describe("WhatsApp label color index (0-19)"),
      },
    },
    async ({ sessionId, labelId, name, color }) => {
      const data = await openwaClient({
        method: "PUT",
        path: `/sessions/${sessionId}/labels/${labelId}`,
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
        path: `/sessions/${sessionId}/labels/chat/${chatId}`,
        body: { labelId },
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
        path: `/sessions/${sessionId}/labels/chat/${chatId}/${labelId}`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
