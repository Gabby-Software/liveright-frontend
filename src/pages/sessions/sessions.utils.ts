import { Session, SessionFilter } from '../../types/session.type'

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
