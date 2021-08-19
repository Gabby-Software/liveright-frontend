import moment from 'moment'
import React, { useState } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { trainingSplitData } from '../../plans.data'
import Styles from './training-splits-desktop.styles'

const TrainingSplitsDesktop = () => {
  const [page, setPage] = useState(1)
  const { t } = useTranslation()
  const labels = [
    t('plans:trainer-name'),
    t('plans:split-name'),
    t('plans:start-date'),
    t('plans:end-date'),
    t('plans:days'),
    t('plans:status')
  ]
  const keys = [
    'trainer_name',
    'split_name',
    'start_date',
    'end_date',
    'days',
    'status'
  ]
  return (
    <Styles>
      <DataTable
        labels={labels}
        data={trainingSplitData.slice((page - 1) * 10, page * 10)}
        keys={keys}
        render={{
          end_date: ({ start_date, days }) =>
            moment(start_date).add(days, 'days').format('YYYY-MM-DD'),
          status: ({ status }) => (
            <span className={`split__status split__status__${status}`}>
              {capitalize(status)}
            </span>
          )
        }}
      />
      <DataPagination
        page={page}
        setPage={setPage}
        total={trainingSplitData.length}
      />
    </Styles>
  )
}

export default TrainingSplitsDesktop
