import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolvedFn } from '../types'
import mergeConfig from './mergeConfig'
import dispatchRequest from './dispatchRequest'
export interface Interceptors {

}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  default: AxiosRequestConfig
  interceptors: Interceptors
  constructor (initConfig: AxiosRequestConfig) {
    this.default = initConfig
    this.interceptors = {}
  }

  request (url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.default, config)

    const chain: PromiseChain<any>[] = [ {
      resolved: dispatchRequest,
      rejected: undefined
    } ]
    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }
}
