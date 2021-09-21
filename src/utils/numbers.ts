export function renderNum(num?: number) {
  return typeof num === 'number' ? `${num}` : '-'
}

export function shortNum(n: number, d = 2): string {
  let x = ('' + n).length
  const p = Math.pow
  d = p(10, d)

  x -= x % 3
  return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3]
}
