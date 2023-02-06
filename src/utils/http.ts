
import axios, { AxiosRequestConfig } from 'axios'
import { MyResponseType } from '@/types/http'

const instance = axios.create({
  baseURL: '/api/v1'
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
  try {
    const { data } = await instance.request<MyResponseType<T>>(config)
    return data
  } catch (err) {
    const message = err.message || '请求失败'
    return {
      code: -1,
      message,
      data: null as any
    }
  }
}

export default request