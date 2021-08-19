/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import moment from 'moment'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { SessionFilter, SessionType } from '../../../../types/session.type'
import SessionUserAvatar from '../session-user-avatar/session-user-avatar.component'
import SessionsFilters from '../sessions-filters/sessions-filters.component'
import Styles from './sessions-table.styles'

interface Props {
  sessions: PaginatedDataType<SessionType>
  getSessions: (page: number, filter?: SessionFilter) => void
  additionalFilters?: SessionFilter
  renderOptions?: (session: SessionType) => ReactElement
  withFilter?: boolean
}

const SessionsTable: React.FC<Props> = (props) => {
  const {
    sessions,
    getSessions,
    additionalFilters,
    renderOptions,
    withFilter
  } = props
  const { data, meta } = sessions
  const { current_page, total } = meta
  const isTrainerType = useAuth().type === userTypes.TRAINER
  const [filter, setFilter] = useState<SessionFilter>({})
  const { labels, keys } = useMemo(() => {
    const labels = [
      'sessions:type',
      'sessions:date',
      'sessions:time',
      'sessions:with'
    ]
    const keys = ['type', 'starts_at', 'time', 'with']

    if (renderOptions) {
      labels.push('sessions:options')
      keys.push('options')
    }

    return { labels, keys }
  }, [renderOptions])

  const handlePageSet = (page: number) => {
    getSessions(page, { ...filter, ...additionalFilters })
  }

  useEffect(() => {
    handlePageSet(1)
  }, [filter, additionalFilters])

  return (
    <Styles>
      {withFilter && <SessionsFilters onUpdate={setFilter} />}
      <DataTable
        labels={labels}
        keys={keys}
        data={data}
        render={{
          with: (it: SessionType) => {
            const person = isTrainerType ? it.client : it.trainer

            return (
              <SessionUserAvatar
                avatar={person?.user.avatar || null}
                first_name={person?.user.first_name}
                last_name={person?.user.last_name}
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
    </Styles>
  )
}

export default SessionsTable
