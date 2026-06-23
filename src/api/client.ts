import type {
  AuthResponse,
  Bot,
  BotStatus,
  Workflow,
  WorkflowStatus,
} from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const TOKEN_KEY = 'botflow_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers,
  })

  if (res.status === 204) {
    return undefined as T
  }

  let data: unknown = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    if (data && typeof data === 'object' && 'error' in data) {
      const errValue = (data as { error: unknown }).error
      if (typeof errValue === 'string') {
        message = errValue
      }
    }
    throw new ApiError(res.status, message)
  }

  return data as T
}

export const api = {
  register(email: string, name: string, password: string) {
    return request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    })
  },

  login(email: string, password: string) {
    return request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  async listBots() {
    const data = await request<{ bots: Bot[] }>('/api/bots')
    return data.bots
  },

  async getBot(id: string) {
    const data = await request<{ bot: Bot }>(`/api/bots/${id}`)
    return data.bot
  },

  async createBot(input: { name: string; description?: string }) {
    const data = await request<{ bot: Bot }>('/api/bots', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return data.bot
  },

  async updateBot(
    id: string,
    input: { name?: string; description?: string; status?: BotStatus },
  ) {
    const data = await request<{ bot: Bot }>(`/api/bots/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    return data.bot
  },

  deleteBot(id: string) {
    return request<void>(`/api/bots/${id}`, { method: 'DELETE' })
  },

  async listWorkflows(botId: string) {
    const data = await request<{ workflows: Workflow[] }>(
      `/api/bots/${botId}/workflows`,
    )
    return data.workflows
  },

  async createWorkflow(
    botId: string,
    input: { name: string; trigger: string },
  ) {
    const data = await request<{ workflow: Workflow }>(
      `/api/bots/${botId}/workflows`,
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    )
    return data.workflow
  },

  async updateWorkflow(
    botId: string,
    workflowId: string,
    input: { name?: string; trigger?: string; status?: WorkflowStatus },
  ) {
    const data = await request<{ workflow: Workflow }>(
      `/api/bots/${botId}/workflows/${workflowId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(input),
      },
    )
    return data.workflow
  },

  deleteWorkflow(botId: string, workflowId: string) {
    return request<void>(`/api/bots/${botId}/workflows/${workflowId}`, {
      method: 'DELETE',
    })
  },
}
