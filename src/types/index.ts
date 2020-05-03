export type Method = | 'get'
| 'GET'
| 'post'
| 'POST'
| 'delete'
| 'DELETE'
| 'head'
| 'HEAD'
| 'options'
| 'OPTIONS'
| 'put'
| 'PUT'
| 'patch'
| 'PATCH'

export interface AxiosTransformer {
  (data: any, header?: any): any
}

export interface AxiosRequestConfig {
  url ?: string,
  method ?: Method,
  data ?: any,
  params ?: any,
  responseType ?: XMLHttpRequestResponseType,
  timeout ?: number,
  transformRequest ?: AxiosTransformer | AxiosTransformer[],
  transformResponse ?: AxiosTransformer | AxiosTransformer[],
  withCredentials?: boolean,
  xsrfCookieName?: string,
  xsrfHeaderName?: string,
  [propName: string]: any
}

export interface AxiosPromise<T= any> extends Promise<AxiosResponse<T>> {

}

export interface AxiosResponse<T= any> {
  data: T,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request: any
}

export interface Axios {
  default: AxiosTransformer,
  interceptors: {
    request: any
    response: any
  }
  request<T = any> (config: AxiosRequestConfig): AxiosPromise<T>,
  get<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>,
  delete<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  getUri (config?: AxiosRequestConfig): string

}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
