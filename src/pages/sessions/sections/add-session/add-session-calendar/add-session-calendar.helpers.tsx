import moment, { Moment } from 'moment'

export const getStyleHelper = (timeDate: Moment, duration: string) => {
  const durationMoment = moment(duration, 'HH:mm')
  const top = (timeDate.minutes() / 60) * 100
  const height =
    ((durationMoment.hour() * 60 + durationMoment.minutes()) / 60) * 100

  return {
    top: `${top}%`,
    height: `${height}%`
  }
}
