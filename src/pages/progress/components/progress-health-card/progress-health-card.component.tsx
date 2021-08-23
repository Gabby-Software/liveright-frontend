import { Moment } from 'moment'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PROGRESS_LOG_URL } from '../../progress.constants'
import {
  Button,
  Data,
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
  const history = useHistory()

  return (
    <StyledCard noLogs={!data}>
      {icon}
      {data ? (
        <React.Fragment>
          <Quality>{t(`progress:${quality}`)}</Quality>
          <Data>{data}</Data>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Data>{t('progress:noLogs')}</Data>
          <Button
            onClick={() =>
              history.push(
                PROGRESS_LOG_URL.health_data + `/${date?.format('YYYY-MM-DD')}`
              )
            }
            type="primary"
          >
            {t('progress:logNow')}
          </Button>
        </React.Fragment>
      )}
    </StyledCard>
  )
}

export default HealthCard
