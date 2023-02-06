import http from "@/utils/http";
import { SubmitProps } from "../types";

export default {
  login(params: SubmitProps) {
    return http(
      {
        url: '/user/login',
        method: 'post',
        data: params
      }
    )
  },
  registry(params: SubmitProps) {
    return http({
      url: '/user/registry',
      method: 'post',
      data: params
    })
  },
}