/* eslint-disable @typescript-eslint/no-unused-vars */
export const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()
export const monthStartDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay()
export const weekStart = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay())
export const weekEnd = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6 - d.getDay())
export const nextWeek = (d: Date) => new Date()
// export const prevWeek = (d: Date) => new Date(d.getFullYear(), d.get);
export const nextMonth = (d: Date) => new Date()
export const prevMonth = (d: Date) => new Date()
