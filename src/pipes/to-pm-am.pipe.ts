/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
export const toPmAm: (time: string) => string = (time: string) => {
  if (!/[0-2]?\d:[0-5]?\d/.test(time)) return '-'
  const [hour, minute] = time.split(':').map((t) => +t)
  return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${
    hour >= 12 ? 'PM' : 'AM'
  }`
}
