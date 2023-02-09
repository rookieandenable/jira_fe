import http from "@/utils/http";
import { MembersType, ProjectListType, EpicListType } from '@/types/http'
import { KanbanListType } from "../types/http";

export default {
  getProjectList() {
    return http<ProjectListType[]>({
      url: '/list/projects',
      method: 'get',
      params: {}
    })
  },
  getMembersList() {
    return http<MembersType[]>({
      url: '/list/members',
      method: 'get',
      params: {}
    })
  },
  modifyShrine(params) {
    return http({
      url: '/list/collection',
      method: 'post',
      data: params
    })
  },
  createProject(params) {
    return http({
      url: '/list/create',
      method: 'post',
      data: params
    })
  },
  deleteProjectItem(params) {
    return http({
      url: '/list/delete',
      method: 'post',
      data: params
    })
  },
  modifyProjectItem(params) {
    return http({
      url: '/list/modify',
      method: 'post',
      data: params
    })
  },
  getEpicsList(params) {
    return http<EpicListType[]>({
      url: '/list/getTask',
      method: 'get',
      params
    })
  },
  createEpic(params) {
    return http({
      url: '/list/createTask',
      method: 'post',
      data: params
    })
  },
  deleteEpic(params) {
    return http({
      url: '/list/deleteTask',
      method: 'post',
      data: params
    })
  },
  getKanbanList(params) {
    return http<KanbanListType[]>({
      url: '/list/getKanbanList',
      method: 'get',
      params
    })
  },
}