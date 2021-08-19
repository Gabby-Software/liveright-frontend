import moment from 'moment'
export const date = (d: string | null | undefined) =>
  d ? moment(d).format('YYYY-MM-DD') : ''
