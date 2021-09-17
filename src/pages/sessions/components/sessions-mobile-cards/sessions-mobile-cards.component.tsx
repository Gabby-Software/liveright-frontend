import React, { ReactElement, ReactNode } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import { SessionType } from '../../../../types/session.type'
import SessionCard from '../session-mobile-card/session-mobile-card.component'
import SessionsFilters from '../sessions-filters/sessions-filters.component'

interface Props {
  renderOptions?: (session: SessionType) => ReactElement
  withFilter?: boolean
  title?: boolean
  titleComponent?: ReactNode
  filterCalendar?: boolean
}

export default function SessionsCards({
  renderOptions,
  withFilter,
  title,
  filterCalendar,
  meta,
  filters,
  onFilters,
  sessions,
  onSearch,
  titleComponent,
  onPage,
  isLoading
}: Props &
  Pick<
    UseSessions,
    | 'sessions'
    | 'meta'
    | 'filters'
    | 'onFilters'
    | 'onSearch'
    | 'onPage'
    | 'isLoading'
  >) {
  const { current_page, total } = meta

  return (
    <div>
      {title && (
        <div className="sessions__cards-title-container">
          <h3 className="sessions__cards-title">{title}</h3>
          {titleComponent}
        </div>
      )}
      {withFilter && (
        <SessionsFilters
          filters={filters}
          onFilters={onFilters}
          onSearch={onSearch}
          calendar={filterCalendar}
        />
      )}

      <div className="sessions__cards-container">
        {isLoading ? (
          <LoadingPlaceholder />
        ) : !sessions.length ? (
          <EmptyPlaceholder />
        ) : (
          sessions.map((it) => (
            <SessionCard
              session={it}
              key={it.id}
              renderOptions={renderOptions}
            />
          ))
        )}
      </div>

      <DataPagination
        justify="center"
        page={current_page}
        setPage={onPage}
        total={total}
      />
    </div>
  )
}
