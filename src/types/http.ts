/**
 * api ts types
 */
export interface MyResponseType<T = any> {
  code: number;
  message?: string;
  msg?: string;
  data: T;
}

export interface MembersType {
  id: number;
  name: string;
  organization: string;
}

export interface ProjectListType {
  id: number;
  name: string;
  created: string;
  organization: string;
  personId: number;
  enshrine: boolean;
}

export interface EpicListType {
  id: number;
  name: string;
  projectId: number;
  created: number;
  end: number;
}

export interface KanbanChildrenType {
  name: string;
  typeId: number;
  id: number;
  sort: number;
}

export interface KanbanListType {
  name: string;
  projectId: number;
  id: number;
  sort: number;
  children: KanbanChildrenType[]
}