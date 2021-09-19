import get from 'lodash/get'
import moment from 'moment'
import React, { useContext, useMemo } from 'react'
import { useParams } from 'react-router'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { PROGRESS_TABLE_KEYS } from '../../progress.constants'
import { HealthData } from '../../progress.types'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import { Pagination, Wrapper } from './progress-table.styles'

export default function HealthTable() {
  const params = useParams<any>()
  const { t } = useTranslation()

  const { health, onlyInclude, isLoading } = useContext(
    ProgressHealthDataContext
  )

  const qualityKey = `${onlyInclude}.quality`
  const reportedByKey = `${onlyInclude}.reported_by`

  const { labels, keys } = useMemo(() => {
    const labels = [
      'progress:date',
      'progress:reported_by',
      'progress:qualityLabel',
      ...PROGRESS_TABLE_KEYS[onlyInclude].map((it) => `progress:${it}`)
    ]
    const keys = [
      'date',
      reportedByKey,
      qualityKey,
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

      <Pagination>
        <DataPagination page={1} setPage={() => {}} total={1} justify="between">
          <Button
            to={getRoute(
              Routes.PROGRESS_LOG_HEALTH_DATA +
                `/${moment().format('YYYY-MM-DD')}`,
              {
                id: params.id
              }
            )}
            variant="text"
            className="pagination__link"
          >
            Some day missing? Add it
            <AddIcon />
          </Button>
        </DataPagination>
      </Pagination>
    </Wrapper>
  )
}
