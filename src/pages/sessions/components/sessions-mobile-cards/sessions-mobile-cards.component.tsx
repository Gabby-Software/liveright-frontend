import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { SessionFilter, SessionType } from '../../../../types/session.type'
import SessionCard from '../session-mobile-card/session-mobile-card.component'
import SessionsFilter from '../sessions-filters/sessions-filters.component'

interface Props {
  sessions: PaginatedDataType<SessionType>
  getSessions: (page: number, filter?: SessionFilter) => void
  renderOptions?: (session: SessionType) => ReactElement
  onRemoveSession?: (id: number) => void
  withFilter?: boolean
  title?: boolean
  titleComponent?: ReactNode
  filterCalendar?: boolean
}

const SessionsCards: React.FC<Props> = (props) => {
  const {
    sessions,
    getSessions,
    renderOptions,
    withFilter,
    title,
    filterCalendar,
    titleComponent
  } = props
  const { data, meta } = sessions
  const { current_page, total } = meta
  const [filter, setFilter] = useState<SessionFilter>({})

  const handlePageSet = (page: number) => {
    getSessions(page, filter)
  }

  useEffect(() => {
    handlePageSet(1)
  }, [filter])

  return (
    <div>
      {title && (
        <div className="sessions__cards-title-container">
          <h3 className="sessions__cards-title">{title}</h3>
          {titleComponent}
        </div>
      )}
      {withFilter && (
        <SessionsFilter onUpdate={setFilter} calendar={filterCalendar} />
      )}
      {data.map((it) => {
        return (
          <SessionCard session={it} key={it.id} renderOptions={renderOptions} />
        )
      })}
      <DataPagination
        justify="center"
        page={current_page}
        setPage={getSessions}
        total={total}
      />
    </div>
  )
}

export default SessionsCards
