/**
 * TS通用类型
 */

export interface SubmitProps {
  username: string
  password: string
  cpassword?: string
}

export interface Kanban {
  id?: number
  name?: string
  projectId?: number
}