import moment from 'moment'
export const timeWithSeconds = (t?: string): string | undefined =>
  t ? moment(t, 'HH:mm').format('HH:mm:ss') : undefined
