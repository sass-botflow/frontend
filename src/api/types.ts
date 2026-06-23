export type BotStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
export type WorkflowStatus = 'INACTIVE' | 'ACTIVE' | 'ERROR'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Workflow {
  id: string
  name: string
  trigger: string
  config: string
  status: WorkflowStatus
  botId: string
  createdAt: string
  updatedAt: string
}

export interface Bot {
  id: string
  name: string
  description: string | null
  status: BotStatus
  userId: string
  createdAt: string
  updatedAt: string
  workflows?: Workflow[]
}
