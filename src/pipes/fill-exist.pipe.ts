export const fillExist = (data: { [key: string]: any }) => {
  const obj: { [key: string]: any } = {}
  for (const [key, value] of Object.entries(data)) {
    if (value) obj[key] = value
  }
  return obj
}
