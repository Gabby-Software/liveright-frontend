import { Popover } from 'antd'
import React, { ReactElement } from 'react'
import { useParams } from 'react-router'

import { ReactComponent as ArrowIcon } from '../../../../assets/media/icons/right-arrow.svg'
import Button from '../../../../components/buttons/button/button.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { Data, Quality, StyledCard } from './progress-health-card.styles'

interface Props {
  icon: ReactElement
  quality?: string
  data?: string
  date?: string
  title: string
}

const HealthCard: React.FC<Props> = (props) => {
  const { icon, quality, data, date, title } = props
  const { t } = useTranslation()
  const params = useParams<any>()
  const { type } = useAuth()

  const logTo =
    type === userTypes.CLIENT
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA, {
          date
        })
      : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
          id: params.id,
          date
        })

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
                to={logTo}
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
