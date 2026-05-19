import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerMessageTools(server: McpServer) {
  server.registerTool(
    "send_text",
    {
      description: "Send a text message to a WhatsApp chat. chatId format: 5511999999999@c.us for contacts or 5511999999999-1234567890@g.us for groups.",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        chatId: z.string().describe("Target chat ID"),
        text: z.string().describe("Message text content"),
      },
    },
    async ({ sessionId, chatId, text }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-text`,
        body: { chatId, text },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_image",
    {
      description: "Send an image to a WhatsApp chat by providing a publicly accessible URL",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        chatId: z.string().describe("Target chat ID"),
        url: z.string().describe("Public URL of the image"),
        caption: z.string().optional().describe("Optional caption for the image"),
      },
    },
    async ({ sessionId, chatId, url, caption }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-image`,
        body: { chatId, url, caption },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_file",
    {
      description: "Send a file/document to a WhatsApp chat by providing a publicly accessible URL",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        chatId: z.string().describe("Target chat ID"),
        url: z.string().describe("Public URL of the file"),
        filename: z.string().describe("Filename to display in the chat"),
        caption: z.string().optional().describe("Optional caption for the file"),
      },
    },
    async ({ sessionId, chatId, url, filename, caption }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-file`,
        body: { chatId, url, filename, caption },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_audio",
    {
      description: "Send an audio file to a WhatsApp chat by providing a publicly accessible URL",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        chatId: z.string().describe("Target chat ID"),
        url: z.string().describe("Public URL of the audio file"),
      },
    },
    async ({ sessionId, chatId, url }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-audio`,
        body: { chatId, url },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_video",
    {
      description: "Send a video to a WhatsApp chat by providing a publicly accessible URL",
      inputSchema: {
        sessionId: z.string().describe("Session ID to send from"),
        chatId: z.string().describe("Target chat ID"),
        url: z.string().describe("Public URL of the video"),
        caption: z.string().optional().describe("Optional caption for the video"),
      },
    },
    async ({ sessionId, chatId, url, caption }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-video`,
        body: { chatId, url, caption },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "react_to_message",
    {
      description: "React to a specific WhatsApp message with an emoji",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        chatId: z.string().describe("Chat ID containing the message"),
        messageId: z.string().describe("ID of the message to react to"),
        reaction: z.string().describe("Emoji reaction (e.g. 👍, ❤️, 😂)"),
      },
    },
    async ({ sessionId, chatId, messageId, reaction }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/react`,
        body: { chatId, messageId, reaction },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_messages",
    {
      description: "Retrieve message history from a specific WhatsApp chat",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        chatId: z.string().describe("Chat ID to fetch messages from"),
      },
    },
    async ({ sessionId, chatId }) => {
      const data = await openwaClient({
        method: "GET",
        path: `/sessions/${sessionId}/chats/${chatId}/messages`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "delete_message",
    {
      description: "Delete a specific message from a WhatsApp chat",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        messageId: z.string().describe("ID of the message to delete"),
      },
    },
    async ({ sessionId, messageId }) => {
      const data = await openwaClient({
        method: "DELETE",
        path: `/sessions/${sessionId}/messages/${messageId}`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
