export function omitEmpty(obj: Record<string, any>): Record<string, any> {
  const copy: Record<string, any> = {}

  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (typeof obj[key] === 'string') {
        if (obj[key]) {
          copy[key] = obj[key]
        }
      } else {
        copy[key] = obj[key]
      }
    }
  })

  return copy
}

export function getObjectFromArrays(keys: any[], values: any[]) {
  const obj: any = {}

  keys.forEach((value: any, index: number) => {
    obj[value] = values[index]
  })

  return obj
}
