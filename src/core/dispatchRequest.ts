import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { buildURL, combineURL, isAbsoluteURL } from '../helper/url'
import { transform } from '../helper/transform'
import { flattenHeaders } from '../helper/headers'
import xhr from './xhr'
function throwIfCancellationRequested (config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL (config: AxiosRequestConfig): string {
  const { params, paramsSerializer, baseURL } = config
  let { url } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
