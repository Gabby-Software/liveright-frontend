import moment from 'moment'
import { ICalEvent } from 'react-icalendar-link/dist/utils'

import { Session, SessionFilter, SessionType } from '../../types/session.type'

export function formatFilters(type: string, date: string, onUpdate: any): void {
  const result: Pick<SessionFilter, 'type' | 'date'> = {}

  if (type !== 'All') {
    result.type = type
  }

  if (date.trim()) {
    const isDate = /^\d{4}-\d{2}-\d{2}$/.test(date)

    if (isDate) {
      result.date = date
    } else if (type === 'All' && (date as Session)) {
      result.type = date
    }
  }

  onUpdate(result)
}

export const getCalenderEvent = (
  item: SessionType,
  user: 'client' | 'trainer'
): ICalEvent => {
  const client_name = `${item.client?.user.first_name} ${item.client?.user.last_name}`
  const trainer_name = `${item.trainer?.user.first_name} ${item.trainer?.user.last_name}`
  return {
    title: item.type,
    startTime: item.starts_at,
    endTime: item.ends_at,
    attendees: [
      `${item.client?.user.first_name} ${item.client?.user.last_name}`,
      `${item.trainer?.user.first_name} ${item.trainer?.user.last_name}`
    ],
    description: `Your ${item.type} session is scheduled with ${
      user === 'client' ? trainer_name : client_name
    } at ${moment(item.starts_at).format('YYYY-MM-DD HH:MM')}`
  }
}
