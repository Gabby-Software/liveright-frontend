import moment from 'moment'

import { DATE_FORMAT, TIME_FORMAT } from '../date'

export const EVENT_LABELS: any = {
  invoices: 'Invoice',
  sessions: 'PT Session'
}

export function parseActivities(data: any[]) {
  try {
    const res: any[] = []

    data.forEach((row) => {
      const activities = row.activities.map((act: any) => ({
        ...act,
        date: row.date
      }))
      res.push(...activities)
    })

    return res
  } catch (e) {
    console.error(e)
    return []
  }
}

export function getEventTitle(e: any) {
  return (
    (e.resource_type === 'sessions'
      ? e.resource.type
      : EVENT_LABELS[e.resource_type]) || 'Event'
  )
}

export function getEventTime(e: any) {
  if (e.resource_type === 'sessions') {
    const start = moment(`${e.date} ${e.time}`, `${DATE_FORMAT} ${TIME_FORMAT}`)
    const end = moment(start).add(moment.duration(e.resource.duration))
    return {
      start: start.toDate(),
      end: end.toDate()
    }
  }
  return null
}

export function formatWeekActivities(data: any[]) {
  try {
    const res: any[] = []

    data.forEach((row) => {
      if (row.resource_type === 'sessions' && row.resource.duration) {
        const time = getEventTime(row)
        res.push({
          title: getEventTitle(row),
          start: time?.start,
          end: time?.end
        })
      }
    })

    return res
  } catch (e) {
    console.error(e)
    return []
  }
}
