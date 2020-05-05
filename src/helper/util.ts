const toSting = Object.prototype.toString

export function isPlainObject (val: any): boolean {
  return toSting.call(val) === '[object Object]'
}

export function isDate (val: any): val is Date {
  return toSting.call(val) === '[object Date]'
}

export function isFormData (val: any): val is FormData {
  return typeof val !== undefined && val instanceof FormData
}

export function isURLSearchParams (val: any): val is URLSearchParams {
  return typeof val !== undefined && val instanceof URLSearchParams
}

export function deepMerge (...objs: any[]) {
  const result = Object.create(null)

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
