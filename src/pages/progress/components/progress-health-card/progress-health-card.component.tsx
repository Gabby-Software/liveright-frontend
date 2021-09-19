import { Popover } from 'antd'
import { Moment } from 'moment'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router'

import { ReactComponent as ArrowIcon } from '../../../../assets/media/icons/right-arrow.svg'
import Button from '../../../../components/buttons/button/button.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { PROGRESS_LOG_URL } from '../../progress.constants'
import { Data, Quality, StyledCard } from './progress-health-card.styles'

interface Props {
  icon: ReactElement
  quality?: string
  data?: string
  date?: Moment
  title: string
}

const HealthCard: React.FC<Props> = (props) => {
  const { icon, quality, data, date, title } = props
  const { t } = useTranslation()
  const params = useParams<any>()

  return (
    <Popover content={title}>
      <StyledCard noLogs={!data}>
        {icon}
        <div className="health-card__content">
          {data ? (
            <>
              <Quality>{t(`progress:${quality || ''}`)}</Quality>
              <Data>{data}</Data>
            </>
          ) : (
            <>
              <Data>{t('progress:noLogs')}</Data>

              <Button
                to={getRoute(
                  PROGRESS_LOG_URL.health_data +
                    `/${date?.format('YYYY-MM-DD')}`,
                  { id: params.id }
                )}
                variant="text"
                size="sm"
                className="health-card__btn"
              >
                <span>{t('progress:logNow')}</span>
                <ArrowIcon />
              </Button>
            </>
          )}
        </div>
      </StyledCard>
    </Popover>
  )
}

export default HealthCard
