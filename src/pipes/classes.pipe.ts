export const classes = (...names: any[]) =>
  names
    .filter((n) => !!n)
    .map((n) => n.toString())
    .join(' ')
