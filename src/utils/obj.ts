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
