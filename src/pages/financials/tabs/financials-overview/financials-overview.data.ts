import moment, { Moment } from 'moment'

import { statisticRange } from '../../../../enums/financials.enum'
import { forOf } from '../../../../pipes/for-of.pipe'

export type DataType = {
  from: Moment
  to: Moment
  actual: number[]
  goal: number[]
}
export const statsData: { [key: string]: DataType } = {
  [statisticRange.MONTH]: {
    from: moment().add(-1, 'month'),
    to: moment(),
    actual: forOf(
      moment().diff(moment().add(-1, 'month'), 'days'),
      () => Math.round(Math.random() * 200) + 200
    ),
    goal: forOf(
      moment().diff(moment().add(-1, 'month'), 'days'),
      () => Math.round(Math.random() * 50) + 250
    )
  },
  [statisticRange.QUARTER]: {
    from: moment().add(-3, 'month'),
    to: moment(),
    actual: forOf(
      moment().diff(moment().add(-3, 'month'), 'weeks'),
      () => Math.round(Math.random() * 200) + 200
    ),
    goal: forOf(
      moment().diff(moment().add(-3, 'month'), 'weeks'),
      () => Math.round(Math.random() * 50) + 250
    )
  },
  [statisticRange.HALF_YEAR]: {
    from: moment().add(-6, 'month'),
    to: moment(),
    actual: forOf(
      moment().diff(moment().add(-6, 'month'), 'weeks'),
      () => Math.round(Math.random() * 200) + 200
    ),
    goal: forOf(
      moment().diff(moment().add(-6, 'month'), 'weeks'),
      () => Math.round(Math.random() * 50) + 250
    )
  },
  [statisticRange.YEAR]: {
    from: moment().add(-1, 'year'),
    to: moment(),
    actual: forOf(
      moment().diff(moment().add(-1, 'year'), 'months'),
      () => Math.round(Math.random() * 200) + 200
    ),
    goal: forOf(
      moment().diff(moment().add(-1, 'year'), 'months'),
      () => Math.round(Math.random() * 50) + 250
    )
  }
}
