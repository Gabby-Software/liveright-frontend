export const capitalize = (str: string | null | undefined) => {
  return (str || '')
    .split(' ')
    .map((s) => (s[0]?.toUpperCase() || '') + s.substring(1))
    .join(' ')
}
