import get from 'lodash/get'
import React from 'react'

import ProgressLogCard from '../../../../components/cards/progress-log-card/progress-log-card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { PROGRESS_LOG, PROGRESS_TABLE_KEYS } from '../../progress.constants'
import {
  HealthData as HealthDataType,
  ProgressLogType
} from '../../progress.types'
import { Wrapper } from './progress-mobile-cards.styles'

interface Props {
  activeTab: ProgressLogType
  data: PaginatedDataType<HealthDataType>
  onPageChange?: (page?: number) => void
}

const HealthMobileCards: React.FC<Props> = (props) => {
  const { data, activeTab, onPageChange } = props
  const { data: logs, meta } = data
  const { current_page, total } = meta

  const handlePageSet = (p: number) => {
    onPageChange && onPageChange(p)
  }

  return (
    <Wrapper>
      {logs.map((it) => {
        const quality = get(it, `${activeTab}.quality`)
        const keys = PROGRESS_TABLE_KEYS[activeTab]
        let sleepData = ''
        let napData = ''

        if (it.sleep) {
          const { start_time, end_time, nap_start_time, nap_end_time } =
            it.sleep
          const startSleep = timeWithoutSeconds(start_time)
          const endSleep = timeWithoutSeconds(end_time)
          const startNap = timeWithoutSeconds(nap_start_time)
          const endNap = timeWithoutSeconds(nap_end_time)

          sleepData = `From ${startSleep} to ${endSleep}`
          napData =
            startNap && endNap ? `Nap from ${startNap} to ${endNap}` : ''
        }

        return (
          <ProgressLogCard
            key={it.id}
            date={it.date || ''}
            quality={quality}
            sleepData={sleepData}
            napData={napData}
            value={
              activeTab === PROGRESS_LOG.SLEEP
                ? ''
                : get(it, `${activeTab}.${keys[0]}`)
            }
          />
        )
      })}

      <DataPagination
        page={current_page}
        setPage={handlePageSet}
        total={total}
        justify="center"
      />
    </Wrapper>
  )
}

export default HealthMobileCards
