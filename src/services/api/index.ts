/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios'

import ResponseError from './ResponseError'
import { getCurrentAccessToken } from './token'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization !== false) {
      const token = getCurrentAccessToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

interface Params {
  data?: object
  config?: {
    headers?: object
  }
  url: string
}

export async function get<R>(data: Params) {
  try {
    const response = await api.get<R>(data.url, { ...data.config })

    return response.data
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)

    throw new Error()
  }
}

export async function post({ url, data, config }: Params) {
  try {
    const response = await api.post(url, { ...data }, { ...config })

    return response.data
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)
  }
}

export async function getQuotation(): Promise<number> {
  const response = await axios.get(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  )

  return response.data.USDBRL.low
}
