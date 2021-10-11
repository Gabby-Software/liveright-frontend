import moment from 'moment'

import { DATE_FORMAT } from '../date'

const RANGE_FREQ: Record<string, any> = {
  week: 'daily',
  month: 'daily',
  year: 'monthly'
}

export const STATISTIC_INITIAL_PARAMS = (
  from: string,
  to: string,
  accountId?: number
) => ({
  ...(accountId && { account_id: accountId }),
  options: {
    from_date: from || '1980-01-01',
    to_date: to || '2022-12-31'
  },
  data: {
    revenue: {
      invoice: {
        total: true,
        coaching_sessions: true,
        pt_sessions: true,
        consultations_sessions: true,
        other: true,
        overdue: true,
        paid: true
      }
    },
    count: {
      invoice: {
        total: true,
        outstanding: true,
        overdue: true,
        paid: true,
        coaching_sessions: true,
        consultations_sessions: true,
        pt_sessions: true,
        other_sessions: true
      }
    }
  }
})

export const COUNT_INITIAL_PARAMS = (from: string, to: string) => ({
  options: {
    from_date: from || '1980-01-01',
    to_date: to || '2022-12-31'
  },
  data: {
    count: {
      session: {
        total: true,
        coaching: true,
        pt: true,
        consultation: true,
        complimentary: true
      }
    }
  }
})

export const CHART_INITIAL_PARAMS = (
  from: string,
  to: string,
  range: string
) => ({
  options: {
    from_date: from || '1980-01-01',
    to_date: to || '2022-12-31'
  },
  data: {
    chart: {
      revenue: {
        frequency: RANGE_FREQ[range]
      }
    }
  }
})

export function getDateRanges(range: string) {
  switch (range) {
    case 'week':
      return {
        from: moment().startOf('week').format(DATE_FORMAT),
        to: moment().format(DATE_FORMAT)
      }
    case 'month':
      return {
        from: moment().startOf('month').format(DATE_FORMAT),
        to: moment().format(DATE_FORMAT)
      }
    case 'year':
      return {
        from: moment().startOf('year').format(DATE_FORMAT),
        to: moment().format(DATE_FORMAT)
      }
    default:
      return {
        from: '',
        to: ''
      }
  }
}

const DATE_FORMAT_DAILY = 'DD/MM'
const DATE_FORMAT_MONTHLY = 'MM/YYYY'

const FORMATS: Record<string, any> = {
  daily: DATE_FORMAT_DAILY,
  monthly: DATE_FORMAT_MONTHLY
}

export function formatChartData(
  data: Record<string, number>,
  range: string
): any[] {
  return Object.keys(data).map((key) => ({
    value: data[key],
    date: moment(key, DATE_FORMAT).format(FORMATS[RANGE_FREQ[range]])
  }))
}
