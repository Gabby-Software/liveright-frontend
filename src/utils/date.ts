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
