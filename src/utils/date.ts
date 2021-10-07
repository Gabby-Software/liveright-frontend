import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY'
export const MONTH_RENDER_FORMAT = 'DD MMMM'
export const DATE_MONTH_RENDER_FORMAT = 'DD/MM'
export const TIME_RENDER_FORMAT = 'HH:mm'
export const DATE_PRETTY_FORMAT = 'MMM Do, YYYY'

export function getDisabledHours(disableUntilNow: boolean) {
  return disableUntilNow
    ? [...Array(moment().hours())].map((_, index) => index)
    : []
}

export function getDisabledMinutes(disableUntilNow: boolean, hour: number) {
  if (disableUntilNow && moment().hours() === hour) {
    return [...Array(moment().minutes())].map((_, index) => index)
  }

  return []
}

export function hoursBetween(from: number, to: number): number[] {
  const arr = []

  for (let i = from; i <= to; i++) {
    arr.push(i)
  }

  return arr
}

export function isOverlap(
  start1 = '',
  end1 = '',
  start2 = '',
  end2 = ''
): boolean {
  try {
    if (!(start1 && end1 && start2 && end2)) {
      return false
    }

    const s1 = moment(start1, 'H:mm')
    const e1 = moment(end1, 'H:mm')
    const s2 = moment(start2, 'H:mm')
    const e2 = moment(end2, 'H:mm')

    return (
      (s2.isAfter(s1) && s2.isBefore(e1)) || (e2.isAfter(s1) && e2.isBefore(e1))
    )
  } catch (e) {
    return false
  }
}

export function isOverlapBetween(s1 = '', e1 = '', s2 = '', e2 = ''): boolean {
  return isOverlap(s1, e1, s2, e2) || isOverlap(s2, e2, s1, e1)
}

export function isDateOverlap(
  start1 = '',
  end1 = '',
  start2 = '',
  end2 = ''
): boolean {
  try {
    if (!(start1 && end1 && start2 && end2)) {
      return false
    }

    const s1 = moment(start1, DATE_FORMAT)
    const e1 = moment(end1, DATE_FORMAT)
    const s2 = moment(start2, DATE_FORMAT)
    const e2 = moment(end2, DATE_FORMAT)

    return (
      (s2.isSameOrAfter(s1) && s2.isSameOrBefore(e1)) ||
      (e2.isSameOrAfter(s1) && e2.isSameOrBefore(e1))
    )
  } catch (e) {
    console.error(e)
    return false
  }
}

export function isDateOverlapBetween(
  s1 = '',
  e1 = '',
  s2 = '',
  e2 = ''
): boolean {
  return isDateOverlap(s1, e1, s2, e2) || isDateOverlap(s2, e2, s1, e1)
}
