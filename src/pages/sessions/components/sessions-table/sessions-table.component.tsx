import moment from 'moment'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { SessionFilter, SessionType } from '../../../../types/session.type'
import SessionsFilters from '../sessions-filters/sessions-filters.component'

interface Props {
  sessions: PaginatedDataType<SessionType>
  getSessions: (page: number, filter?: SessionFilter) => void
  renderOptions?: (session: SessionType) => ReactElement
  withFilter?: boolean
  FilterProps?: any
  onFilterRef?: (ref: any) => void
}

const SessionsTable: React.FC<Props> = (props) => {
  const {
    sessions,
    getSessions,
    renderOptions,
    withFilter,
    FilterProps,
    onFilterRef
  } = props
  const { data, meta } = sessions
  const { current_page, total } = meta
  const isTrainerType = useAuth().type === userTypes.TRAINER
  const [filter, setFilter] = useState<SessionFilter>({})

  useEffect(() => {
    onFilterRef && onFilterRef(setFilter)
  }, [])

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

  const handlePageSet = (page: number) => {
    getSessions(page, filter)
  }

  useEffect(() => {
    handlePageSet(1)
  }, [filter])

  return (
    <Card className="sessions__table-card">
      {withFilter && (
        <SessionsFilters
          filters={filter}
          onUpdate={setFilter}
          {...FilterProps}
        />
      )}

      <DataTable
        labels={labels}
        keys={keys}
        data={data}
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
      <DataPagination
        page={current_page}
        setPage={handlePageSet}
        total={total}
      />
    </Card>
  )
}

export default SessionsTable
