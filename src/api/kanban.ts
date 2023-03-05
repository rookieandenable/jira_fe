import http from '@/utils/http';
import { KanbanListType } from '@/types/http';

export default {
  getKanbanList(params) {
    return http<KanbanListType[]>({
      url: '/list/getKanbanList',
      method: 'get',
      params,
    })
  },
  toMoveColumn(params) {
    return http({
      url: '/list/moveColumn',
      method: 'post',
      data: params,
    })
  },
  toMoveRow(params) {
    return http({
      url: '/list/moveRow',
      method: 'post',
      data: params,
    })
  },
  createKanbanGroup(params) {
    return http({
      url: '/list/createKanbanColumn',
      method: 'post',
      data: params,
    })
  },
  deleteKanbanGroup(params) {
    return http({
      url: '/list/deleteKanbanColumn',
      method: 'post',
      data: params,
    })
  },
  createKanbanItem(params) {
    return http({
      url: '/list/createKanbanItem',
      method: 'post',
      data: params,
    })
  },
  updateKanbanItem(params) {
    return http({
      url: '/list/updateKanbanItem',
      method: 'post',
      data: params,
    })
  },
  deleteKanbanItem(params) {
    return http({
      url: '/list/deleteKanbanItem',
      method: 'post',
      data: params,
    })
  },
}