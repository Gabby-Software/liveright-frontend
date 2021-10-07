import get from 'lodash/get'
import moment from 'moment'
import React, { useContext, useMemo } from 'react'
import { useParams } from 'react-router'

import DataTable from '../../../../components/data-table/data-table.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { PROGRESS_TABLE_KEYS } from '../../progress.constants'
import { HealthData } from '../../progress.types'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import TablePagination from '../table-pagination/table-pagination.component'
import { Wrapper } from './progress-table.styles'

export default function HealthTable() {
  const params = useParams<any>()
  const { t } = useTranslation()
  const { type } = useAuth()

  const logTo =
    type === userTypes.CLIENT
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA, {
          date: moment().format('YYYY-MM-DD')
        })
      : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
          id: params.id,
          date: moment().format('YYYY-MM-DD')
        })

  const { health, onlyInclude, isLoading, meta } = useContext(
    ProgressHealthDataContext
  )

  const qualityKey = `${onlyInclude}.quality`
  const reportedByKey = `${onlyInclude}.reported_by`

  const { labels, keys } = useMemo(() => {
    const labels = [
      'progress:date',
      'progress:reported_by',
      ...(onlyInclude !== 'steps' ? ['progress:qualityLabel'] : []),
      ...PROGRESS_TABLE_KEYS[onlyInclude].map((it) => `progress:${it}`)
    ]
    const keys = [
      'date',
      reportedByKey,
      ...(onlyInclude !== 'steps' ? [qualityKey] : []),
      ...PROGRESS_TABLE_KEYS[onlyInclude].map((it) => `${onlyInclude}.${it}`)
    ]

    return { labels, keys }
  }, [])

  const hourFormat = (sleep: string, nap: string) => {
    const ms = moment(sleep || '00:00:00', 'HH:mm:ss')
    const mn = moment(nap || '00:00:00', 'HH:mm:ss')
    ms.add(mn.minutes(), 'minutes')
    ms.add(mn.hours(), 'hours')
    return `${ms.hours()}h ${ms.minutes() ? ms.minutes() + 'm' : ''}`
  }

  return (
    <Wrapper>
      <div className="health-log__table">
        <DataTable
          labels={labels}
          keys={keys}
          data={health}
          render={{
            date: (item: HealthData) => {
              return <span>{item.date}</span>
            },
            [reportedByKey]: (item: HealthData) => {
              const reportedBy = get(item, reportedByKey)

              return reportedBy ? 'You' : ''
            },
            [qualityKey]: (item: HealthData) => {
              const quality = get(item, qualityKey)

              return quality ? t(`progress:${get(item, qualityKey)}`) : ''
            },
            'sleep.total_sleep': (item: HealthData) =>
              hourFormat(
                item?.sleep?.sleep_duration || '00:00:00',
                item?.sleep?.nap_duration || '00:00:00'
              )
          }}
        />
      </div>

      {isLoading ? (
        <LoadingPlaceholder spacing />
      ) : !health.length ? (
        <EmptyPlaceholder spacing />
      ) : null}

      <TablePagination
        logTo={logTo}
        page={meta.current_page}
        onPage={() => {}}
        total={meta.total}
      />
    </Wrapper>
  )
}
