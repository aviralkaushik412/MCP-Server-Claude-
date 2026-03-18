// src/tools/registry.ts
import axios from "axios"
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js"

type ToolHandler = (args: Record<string, unknown>) => Promise<string>

const toolRegistry = new Map<string, ToolHandler>()

export function registerTool(name: string, handler: ToolHandler): void {
  toolRegistry.set(name, handler)
}

export async function dispatchTool(name: string, args: Record<string, unknown>): Promise<string> {
  const handler = toolRegistry.get(name)
  if (!handler) {
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`)
  }
  try {
    return await handler(args)
  } catch (err) {
    // If it's already an MCP error, re-throw it as-is
    if (err instanceof McpError) throw err

    // Axios 404 from GitHub → friendly message
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      throw new McpError(ErrorCode.InvalidParams, `Repository not found. Check the owner and repo name.`)
    }

    // Anything else → generic but safe
    throw new McpError(ErrorCode.InternalError, `Tool failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
  }
}