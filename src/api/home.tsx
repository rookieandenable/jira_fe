import http from "@/utils/http";
import { MembersType, ProjectListType } from '@/types/http'

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
  }
}