import get from 'lodash/get'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as EditIcon } from '../../../../assets/media/icons/edit.svg'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { PROGRESS_LOG_URL, PROGRESS_TABLE_KEYS } from '../../progress.constants'
import {
  HealthData,
  HealthData as HealthDataType,
  ProgressLogType
} from '../../progress.types'
import { DateButton, Wrapper } from './progress-table.styles'

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
      ...PROGRESS_TABLE_KEYS[activeTab].map((it) => `progress:${it}`),
      'progress:qualityLabel'
    ]
    const keys = [
      'date',
      reportedByKey,
      ...PROGRESS_TABLE_KEYS[activeTab].map((it) => `${activeTab}.${it}`),
      qualityKey
    ]

    return { labels, keys }
  }, [])

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
          }
        }}
      />
      <DataPagination
        page={current_page}
        setPage={handlePageSet}
        total={total}
      />
    </Wrapper>
  )
}

export default HealthTable
