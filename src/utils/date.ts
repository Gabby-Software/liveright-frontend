import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'

export const DATE_RENDER_FORMAT = 'DD-MM-YYYY'
export const MONTH_RENDER_FORMAT = 'DD MMMM'
export const DATE_MONTH_RENDER_FORMAT = 'DD/MM'
export const TIME_RENDER_FORMAT = 'HH:mm'

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
  start1?: string,
  end1?: string,
  start2?: string,
  end2?: string
): boolean {
  try {
    if (!(start1 && end1 && start2 && end2)) {
      return false
    }
    // console.log(start1, end1, start2, end2)

    const s1 = moment(start1, 'H:mm')
    const e1 = moment(end1, 'H:mm')
    const s2 = moment(start2, 'H:mm')
    const e2 = moment(end2, 'H:mm')

    // console.log(s1, e1)

    return s1.isAfter(e2) && s2.isBefore(e1)
  } catch (e) {
    return false
  }
}
