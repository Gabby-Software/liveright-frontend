import { OptionType } from '../types/option.type'

export const statisticRange = {
  MONTH: 'month',
  QUARTER: 'quarter',
  HALF_YEAR: '6_month',
  YEAR: 'year'
}

export const statisticRangeOptions: OptionType[] = [
  { label: 'This Month', value: statisticRange.MONTH },
  { label: 'This Quarter', value: statisticRange.QUARTER },
  { label: 'Last 6 Month', value: statisticRange.HALF_YEAR },
  { label: 'Last Year', value: statisticRange.YEAR }
]

export const chartRangeOptions: OptionType[] = [
  { label: 'Day View', value: 'day' }
]
