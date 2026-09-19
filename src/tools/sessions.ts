import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { openwaClient } from "../client.js";

export function registerSessionTools(server: McpServer) {
  server.registerTool(
    "get_sessions",
    {
      description: "List all WhatsApp sessions currently managed by OpenWA",
      inputSchema: {},
    },
    async () => {
      const data = await openwaClient({ method: "GET", path: "/sessions" });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "create_session",
    {
      description: "Create a new WhatsApp session with the given name",
      inputSchema: {
        name: z.string().describe("Unique name for the new session"),
      },
    },
    async ({ name }) => {
      const data = await openwaClient({ method: "POST", path: "/sessions", body: { name } });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "start_session",
    {
      description: "Start a stopped WhatsApp session to make it active",
      inputSchema: {
        sessionId: z.string().describe("ID of the session to start"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "POST", path: `/sessions/${sessionId}/start` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "stop_session",
    {
      description: "Stop a running WhatsApp session gracefully",
      inputSchema: {
        sessionId: z.string().describe("ID of the session to stop"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "POST", path: `/sessions/${sessionId}/stop` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "delete_session",
    {
      description: "Permanently delete a WhatsApp session and its data",
      inputSchema: {
        sessionId: z.string().describe("ID of the session to delete"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "DELETE", path: `/sessions/${sessionId}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_session_qr",
    {
      description: "Get the QR code data for authenticating a WhatsApp session. Use this when a session needs to be scanned with WhatsApp mobile.",
      inputSchema: {
        sessionId: z.string().describe("ID of the session to get QR for"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}/qr` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.registerTool(
    "get_session_status",
    {
      description: "Check the current connection status of a WhatsApp session (connected, disconnected, etc.)",
      inputSchema: {
        sessionId: z.string().describe("ID of the session to check"),
      },
    },
    async ({ sessionId }) => {
      const data = await openwaClient({ method: "GET", path: `/sessions/${sessionId}` });
      return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
    }
  );
}
