import moment from 'moment'
export const chatTime = (date: string) => {
  const m = moment(date)
  if (m.isBefore(moment(), 'day')) {
    return m.format('DD/MM')
  }
  return m.format('h:mm A')
}
