import moment from 'moment'

export const getDuration = (t1?: string, t2?: string): string | undefined => {
  const time1Moment = moment(t1, 'HH:mm')
  const time2Moment = moment(t2, 'HH:mm')
  const duration = moment.duration(time2Moment.diff(time1Moment))
  return t1 && t2
    ? moment(`${duration.hours()}:${duration.minutes()}`, 'H:m').format(
        'HH:mm:ss'
      )
    : undefined
}
