import { OptionType } from '../types/option.type'

export const statisticRange = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
}

export const statisticRangeOptions: OptionType[] = [
  { label: 'This Week', value: statisticRange.WEEK },
  { label: 'This Month', value: statisticRange.MONTH },
  { label: 'This Year', value: statisticRange.YEAR }
]

export const chartRangeOptions: OptionType[] = [
  { label: 'Day View', value: 'day' }
]
