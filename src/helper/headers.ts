import { deepMerge } from './util'
import { Method } from '../types/index'

export function parseHeaders (headers: string): any {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    // 字符串可能存在多个 ":" 的情况
    const [ key, ...vals ] = line.split(':')
    const keyTemp = key.trim().toLocaleLowerCase()
    if (!keyTemp) return
    const val = vals.join(':').trim()
    parsed[keyTemp] = val
  })
  return parsed
}

export function flattenHeaders (headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = [ 'delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common' ]

  methodsToDelete.forEach((method) => {
    delete headers[method]
  })

  return headers
}
