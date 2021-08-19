import moment, { Moment } from 'moment'

import { forOf } from './for-of.pipe'

interface DateRangeOptions {
  date: Moment
  range: number
}

export const dateHoursRange = (options: DateRangeOptions): Moment[] => {
  const { date, range } = options
  const initialDate = moment(date).startOf('hours')
  const dates = [initialDate]

  forOf(range, (index) => {
    const amount = index + 1

    dates.unshift(
      moment(initialDate).subtract(amount, 'hours').startOf('hours')
    )
    dates.push(moment(initialDate).add(amount, 'hours').startOf('hours'))
  })

  return dates
}
