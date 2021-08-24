export const filesize = (bytes: number) => {
  if (bytes < 2 ** 10) return `${bytes} B`
  if (bytes / 2 ** 10 < 2 ** 10) return `${Math.floor(bytes / 2 ** 10)} KB`
  if (bytes / 2 ** 20 < 2 ** 10) return `${Math.floor(bytes / 2 ** 20)} MB`
  return `${Math.floor(bytes / 2 ** 30)} GB`
}
