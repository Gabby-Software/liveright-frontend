import { OptionType } from '../types/option.type'

export const statisticRange = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
}

export const statisticRangeOptions: OptionType[] = [
  { label: 'Weekly', value: statisticRange.WEEK },
  { label: 'Monthly', value: statisticRange.MONTH },
  { label: 'Yearly', value: statisticRange.YEAR }
]

export const chartRangeOptions: OptionType[] = [
  { label: 'Day View', value: 'day' }
]
