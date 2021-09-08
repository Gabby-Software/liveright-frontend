import get from 'lodash/get'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as EditIcon } from '../../../../assets/media/icons/edit.svg'
import BlueLink from '../../../../components/blue-link/blue-link.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { PROGRESS_LOG_URL, PROGRESS_TABLE_KEYS } from '../../progress.constants'
import {
  HealthData,
  HealthData as HealthDataType,
  ProgressLogType
} from '../../progress.types'
import { DateButton, Pagination, Wrapper } from './progress-table.styles'

interface Props {
  activeTab: ProgressLogType
  data: PaginatedDataType<HealthDataType>
  onPageChange?: (page?: number) => void
}

const HealthTable: React.FC<Props> = (props) => {
  const { data, activeTab, onPageChange } = props
  const { data: logs, meta } = data
  const { current_page, total } = meta
  const { t } = useTranslation()
  const history = useHistory()
  const qualityKey = `${activeTab}.quality`
  const reportedByKey = `${activeTab}.reported_by`
  const { labels, keys } = useMemo(() => {
    const labels = [
      'progress:date',
      'progress:reported_by',
      'progress:qualityLabel',
      ...PROGRESS_TABLE_KEYS[activeTab].map((it) => `progress:${it}`)
    ]
    const keys = [
      'date',
      reportedByKey,
      qualityKey,
      ...PROGRESS_TABLE_KEYS[activeTab].map((it) => `${activeTab}.${it}`)
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
  const handlePageSet = (p: number) => {
    onPageChange && onPageChange(p)
  }
  return (
    <Wrapper>
      <DataTable
        labels={labels}
        keys={keys}
        data={logs}
        render={{
          date: (item: HealthData) => {
            return (
              <DateButton
                onClick={() =>
                  history.push(PROGRESS_LOG_URL.health_data + `/${item.date}`)
                }
                type="link"
                icon={<EditIcon />}
              >
                {item.date}
              </DateButton>
            )
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
      <Pagination>
        <DataPagination
          page={current_page}
          setPage={handlePageSet}
          total={total}
        >
          <BlueLink
            to={
              Routes.PROGRESS_LOG_HEALTH_DATA +
              `/${moment().format('YYYY-MM-DD')}`
            }
            className={'pagination__link'}
          >
            Some day missing? Add it{' '}
            <span className={'pagination__plus'}>+</span>
          </BlueLink>
        </DataPagination>
      </Pagination>
    </Wrapper>
  )
}

export default HealthTable
