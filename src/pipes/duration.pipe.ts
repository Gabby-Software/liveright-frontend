export const getDuration = (t1?: string, t2?: string): string | undefined => {
  const [h1, m1] = (t1 || ':').split(':').map((t) => +t)
  // eslint-disable-next-line prefer-const
  let [h2, m2] = (t2 || ':').split(':').map((t) => +t)

  if (h2 < h1 || (h2 === h1 && m2 < m1)) {
    h2 += 24
  }
  const minutes = h2 * 60 + m2 - h1 * 60 - m1

  if (isNaN(minutes)) return '-'

  return `${Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}
