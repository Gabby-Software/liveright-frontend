export const excerpt = (str: string | null | undefined, max: number) => {
  str = str || ''
  return str.length > max ? str.substring(0, max - 3) + '...' : str
}
