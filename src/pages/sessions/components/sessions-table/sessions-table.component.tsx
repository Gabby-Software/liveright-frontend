import moment from 'moment'
import React, { ReactElement, useMemo } from 'react'

import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import userTypes from '../../../../enums/user-types.enum'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import { useAuth } from '../../../../hooks/auth.hook'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { SessionType } from '../../../../types/session.type'
import SessionsFilters from '../sessions-filters/sessions-filters.component'

interface Props {
  sessions: SessionType[]
  meta: PaginationMetaType
  renderOptions?: (session: SessionType) => ReactElement
  withFilter?: boolean
  FilterProps?: any
  loading?: boolean
  onPage: (page: number) => void
}

export default function SessionsTable(
  props: Props & Pick<UseSessions, 'filters' | 'onFilters' | 'onSearch'>
) {
  const {
    sessions,
    meta,
    renderOptions,
    withFilter,
    FilterProps,
    loading,
    onPage,
    filters,
    onFilters,
    onSearch
  } = props

  const { current_page, total } = meta
  const isTrainerType = useAuth().type === userTypes.TRAINER

  const { labels, keys } = useMemo(() => {
    const labels = [
      'sessions:type',
      'sessions:date',
      'sessions:time',
      isTrainerType ? 'sessions:trainee' : 'sessions:with'
    ]
    const keys = ['type', 'starts_at', 'time', 'with']

    if (renderOptions) {
      labels.push('sessions:options')
      keys.push('options')
    }

    return { labels, keys }
  }, [renderOptions])

  return (
    <Card className="sessions__table-card">
      {withFilter && (
        <SessionsFilters
          filters={filters}
          onFilters={onFilters}
          onSearch={onSearch}
          {...FilterProps}
        />
      )}

      <DataTable
        labels={labels}
        keys={keys}
        data={sessions}
        className="sessions__table"
        render={{
          with: (it: SessionType) => {
            const person = isTrainerType ? it.client : it.trainer

            return (
              <UserBadge
                avatar={person?.user.avatar?.url}
                firstName={person?.user.first_name}
                lastName={person?.user.last_name}
              />
            )
          },
          starts_at: ({ starts_at }: SessionType) => {
            return moment(starts_at).format('YYYY-MM-DD')
          },
          time: ({ starts_at }: SessionType) => {
            return moment.utc(starts_at).format('HH:mm')
          },
          options: (item) =>
            renderOptions ? renderOptions(item) : React.Fragment
        }}
      />

      {loading ? (
        <LoadingPlaceholder spacing />
      ) : !sessions.length ? (
        <EmptyPlaceholder spacing />
      ) : null}

      <DataPagination page={current_page} setPage={onPage} total={total} />
    </Card>
  )
}
