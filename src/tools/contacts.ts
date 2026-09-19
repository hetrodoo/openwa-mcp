import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerContactTools(server: McpServer) {
  server.registerTool(
    "get_contacts",
    {
      description: "List all contacts stored in the WhatsApp session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/contacts` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_contact",
    {
      description: "Get detailed info for a specific WhatsApp contact",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        contactId: z.string().describe("Contact ID to look up"),
      },
    },
    async ({ sessionId, contactId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/contacts/${contactId}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "check_number",
    {
      description: "Check if a phone number is registered on WhatsApp",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        phone: z.string().describe("Phone number in international format without + prefix"),
      },
    },
    async ({ sessionId, phone }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/contacts/check/${phone}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_profile_picture",
    {
      description: "Get the profile picture URL for a WhatsApp contact",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        contactId: z.string().describe("Contact ID"),
      },
    },
    async ({ sessionId, contactId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/contacts/${contactId}/profile-picture` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "block_contact",
    {
      description: "Block a WhatsApp contact",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        contactId: z.string().describe("Contact ID to block"),
      },
    },
    async ({ sessionId, contactId }) => {
      const data = await openwaClient({ method: "POST", path: `/sessions/${sessionId}/contacts/${contactId}/block` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "unblock_contact",
    {
      description: "Unblock a previously blocked WhatsApp contact",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        contactId: z.string().describe("Contact ID to unblock"),
      },
    },
    async ({ sessionId, contactId }) => {
      const data = await openwaClient({ method: "DELETE", path: `/sessions/${sessionId}/contacts/${contactId}/block` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
