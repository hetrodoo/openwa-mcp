import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerGroupTools(server: McpServer) {
  server.registerTool(
    "get_groups",
    {
      description: "List all WhatsApp groups visible to the given session",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/groups` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "create_group",
    {
      description: "Create a new WhatsApp group with specified participants",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        name: z.string().describe("Group name"),
        participants: z.array(z.string()).describe("Array of participant phone IDs to add"),
      },
    },
    async ({ sessionId, name, participants }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/groups`,
        body: { name, participants },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_group_info",
    {
      description: "Get detailed information about a specific WhatsApp group including members, admins, and settings",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
      },
    },
    async ({ sessionId, groupId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/groups/${groupId}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "add_group_member",
    {
      description: "Add a participant to a WhatsApp group",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        participantId: z.string().describe("WhatsApp ID of the participant to add (e.g. 5511999999999@c.us)"),
      },
    },
    async ({ sessionId, groupId, participantId }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/groups/${groupId}/participants`,
        body: { participants: [participantId] },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "remove_group_member",
    {
      description: "Remove a participant from a WhatsApp group",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        participantId: z.string().describe("WhatsApp ID of the participant to remove (e.g. 5511999999999@c.us)"),
      },
    },
    async ({ sessionId, groupId, participantId }) => {
      const data = await openwaClient({
        method: "DELETE",
        path: `/sessions/${sessionId}/groups/${groupId}/participants`,
        body: { participants: [participantId] },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "promote_member",
    {
      description: "Promote a group participant to admin role",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        participantId: z.string().describe("WhatsApp ID of the participant to promote (e.g. 5511999999999@c.us)"),
      },
    },
    async ({ sessionId, groupId, participantId }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/groups/${groupId}/participants/promote`,
        body: { participants: [participantId] },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "demote_member",
    {
      description: "Demote a group admin back to regular participant",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        participantId: z.string().describe("WhatsApp ID of the admin to demote (e.g. 5511999999999@c.us)"),
      },
    },
    async ({ sessionId, groupId, participantId }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/groups/${groupId}/participants/demote`,
        body: { participants: [participantId] },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "send_group_message",
    {
      description: "Send a text message directly to a WhatsApp group",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        text: z.string().describe("Message text content"),
      },
    },
    async ({ sessionId, groupId, text }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/messages/send-text`,
        body: { chatId: groupId, text },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "leave_group",
    {
      description: "Leave a WhatsApp group",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID to leave"),
      },
    },
    async ({ sessionId, groupId }) => {
      const data = await openwaClient({
        method: "POST",
        path: `/sessions/${sessionId}/groups/${groupId}/leave`,
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "update_group_subject",
    {
      description: "Change the name/subject of a WhatsApp group",
      inputSchema: {
        sessionId: z.string().describe("Session ID"),
        groupId: z.string().describe("Group ID"),
        subject: z.string().describe("New group name/subject"),
      },
    },
    async ({ sessionId, groupId, subject }) => {
      const data = await openwaClient({
        method: "PUT",
        path: `/sessions/${sessionId}/groups/${groupId}/subject`,
        body: { subject },
      });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
