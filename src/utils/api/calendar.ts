import moment from 'moment'

import { DATE_FORMAT, TIME_FORMAT } from '../date'

export const EVENT_LABELS: any = {
  invoices: 'Invoice Due Date',
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
      : e.resource_type === 'events'
      ? e.resource.name
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
  } else if (e.resource_type === 'invoices') {
    const date = moment(e.date, DATE_FORMAT)
    return {
      start: date.toDate(),
      end: date.toDate()
    }
  } else if (e.resource_type === 'events') {
    const start = moment(`${e.date} ${e.time}`, `${DATE_FORMAT} HH:mm:ss`)
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
      const time = getEventTime(row)
      if (row.resource_type === 'sessions' && row.resource.duration) {
        res.push({
          title: getEventTitle(row),
          start: time?.start,
          end: time?.end,
          resource: {
            type: 'session',
            session: row.resource
          }
        })
      } else if (row.resource_type === 'invoices') {
        res.push({
          title: 'Invoice Due Date',
          allDay: true,
          start: time?.start,
          end: time?.end,
          resource: {
            type: 'invoice'
          }
        })
      } else if (row.resource_type === 'events') {
        res.push({
          title: getEventTitle(row),
          start: time?.start,
          end: time?.end,
          resource: {
            type: 'event'
          }
        })
      }
    })

    return res
  } catch (e) {
    console.error(e)
    return []
  }
}

export function formatEventValues(
  values: any,
  accountId: number,
  accountType: string
) {
  const formData: any = {}

  formData['account_id'] = accountId
  formData['access'] = accountType

  Object.keys(values).forEach((key) => {
    formData[key] = values[key]
  })

  return formData
}
