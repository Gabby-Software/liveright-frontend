import get from 'lodash/get'
import React, { useContext } from 'react'

import ProgressLogCard from '../../../../components/cards/progress-log-card/progress-log-card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import { PROGRESS_LOG, PROGRESS_TABLE_KEYS } from '../../progress.constants'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import { Wrapper } from './progress-mobile-cards.styles'

export default function HealthMobileCard() {
  const { health, meta, onlyInclude, isLoading } = useContext(
    ProgressHealthDataContext
  )

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : !health.length ? (
        <EmptyPlaceholder />
      ) : (
        health.map((it) => {
          const quality = get(it, `${onlyInclude}.quality`)
          const keys = PROGRESS_TABLE_KEYS[onlyInclude]
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
              showQuality={onlyInclude !== 'steps'}
              quality={quality}
              sleepData={sleepData}
              napData={napData}
              loggedBy={it[onlyInclude]?.reported_by}
              value={
                onlyInclude === PROGRESS_LOG.SLEEP
                  ? ''
                  : get(it, `${onlyInclude}.${keys[0]}`)
              }
            />
          )
        })
      )}

      <DataPagination
        page={meta.current_page}
        setPage={() => {}}
        total={meta.total}
        justify="center"
      />
    </Wrapper>
  )
}
