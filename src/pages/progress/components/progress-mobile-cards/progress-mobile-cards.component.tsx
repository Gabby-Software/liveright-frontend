import get from 'lodash/get'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as EditIcon } from '../../../../assets/media/icons/edit.svg'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import {
  PROGRESS_LOG,
  PROGRESS_LOG_URL,
  PROGRESS_TABLE_KEYS
} from '../../progress.constants'
import {
  HealthData as HealthDataType,
  ProgressLogType
} from '../../progress.types'
import {
  DateButton,
  LogCard,
  Quality,
  Wrapper
} from './progress-mobile-cards.styles'

interface Props {
  activeTab: ProgressLogType
  data: PaginatedDataType<HealthDataType>
  onPageChange?: (page?: number) => void
}

const HealthMobileCards: React.FC<Props> = (props) => {
  const { data, activeTab, onPageChange } = props
  const { data: logs, meta } = data
  const { current_page, total } = meta
  const { t } = useTranslation()
  const history = useHistory()

  const handlePageSet = (p: number) => {
    onPageChange && onPageChange(p)
  }

  return (
    <Wrapper>
      {logs.map((it) => {
        const quality = get(it, `${activeTab}.quality`)
        const qualityText = quality ? t(`progress:${quality}`) : ''
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

          sleepData = `${t('from')} ${startSleep} ${t('to')} ${endSleep}`
          napData =
            startNap && endNap
              ? `Nap ${t('from')} ${startNap} ${t('to')} ${endNap}`
              : ''
        }

        return (
          <LogCard key={it.id}>
            <DateButton
              onClick={() =>
                history.push(PROGRESS_LOG_URL.health_data + `/${it.date}`)
              }
              type="link"
              icon={<EditIcon />}
            >
              {it.date}
            </DateButton>
            <span>Reported By You</span>
            {activeTab === PROGRESS_LOG.SLEEP ? (
              <div className="sleep-data">
                <span>{sleepData}</span>
                <span>{napData}</span>
              </div>
            ) : (
              <span className="data">{get(it, `${activeTab}.${keys[0]}`)}</span>
            )}
            <Quality>{qualityText}</Quality>
          </LogCard>
        )
      })}
      <DataPagination
        page={current_page}
        setPage={handlePageSet}
        total={total}
      />
    </Wrapper>
  )
}

export default HealthMobileCards
