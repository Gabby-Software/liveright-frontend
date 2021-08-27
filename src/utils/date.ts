import moment from 'moment'

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
