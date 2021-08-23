import moment from 'moment'
export const timeWithSeconds = (t?: string): string | undefined =>
  t ? moment(t, 'HH:mm').format('HH:mm:ss') : undefined

export const timeWithoutSeconds = (t?: string): string | undefined =>
  t ? moment(t, 'HH:mm:ss').format('HH:mm') : undefined
