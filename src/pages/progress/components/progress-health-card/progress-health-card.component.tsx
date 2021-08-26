import { Moment } from 'moment'
import React, { ReactElement } from 'react'

import { ReactComponent as ArrowIcon } from '../../../../assets/media/icons/right-arrow.svg'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PROGRESS_LOG_URL } from '../../progress.constants'
import {
  Data,
  LogLink,
  Quality,
  StyledCard
} from './progress-health-card.styles'

interface Props {
  icon: ReactElement
  quality?: string
  data?: string
  date?: Moment
}

const HealthCard: React.FC<Props> = (props) => {
  const { icon, quality, data, date } = props
  const { t } = useTranslation()

  return (
    <StyledCard noLogs={!data}>
      {icon}
      {data ? (
        <div>
          <Quality>{t(`progress:${quality || ''}`)}</Quality>
          <Data>{data}</Data>
        </div>
      ) : (
        <div>
          <Data>{t('progress:noLogs')}</Data>
          <LogLink
            to={PROGRESS_LOG_URL.health_data + `/${date?.format('YYYY-MM-DD')}`}
          >
            <span>{t('progress:logNow')}</span>
            <ArrowIcon />
          </LogLink>
        </div>
      )}
    </StyledCard>
  )
}

export default HealthCard
