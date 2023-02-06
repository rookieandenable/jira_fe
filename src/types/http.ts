/**
 * api ts types
 */
export interface MyResponseType<T = any> {
  code: number;
  message?: string;
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