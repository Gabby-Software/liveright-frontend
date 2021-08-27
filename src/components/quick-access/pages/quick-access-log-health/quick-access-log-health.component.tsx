import React, { FC } from 'react'

import {
  GlucoseIcon,
  HeartRateIcon,
  SleepIcon,
  StepsIcon
} from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import QuickAccessAction from '../../components/quick-access-action/quick-access-action.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import QuickAccessTitle from '../../components/quick-access-title/quick-access-title.component'
import { quickAccessRoutes } from '../../quick-access.routes'
import { QuickAccessActionType } from '../../types/quick-access-action.type'
import Styles from './quick-access-log-health.styles'
const options: QuickAccessActionType[] = [
  {
    icon: StepsIcon,
    route: quickAccessRoutes.LOG_HEALTH_DATA_STEPS,
    label: 'steps',
    color: '#1268E4'
  },
  {
    icon: HeartRateIcon,
    route: quickAccessRoutes.LOG_HEALTH_DATA_HEART_RATE,
    label: 'heart-rate',
    color: '#F123B8'
  },
  {
    icon: SleepIcon,
    route: quickAccessRoutes.LOG_HEALTH_DATA_SLEEP,
    label: 'sleep',
    color: '#757575'
  },
  {
    icon: GlucoseIcon,
    route: quickAccessRoutes.LOG_HEALTH_DATA_GLUCOSE,
    label: 'glucose',
    color: '#D70004'
  }
]
const QuickAccessLogHealth: FC = () => {
  const { t } = useTranslation()

  return (
    <Styles>
      <QuickAccessBack label={'log'} route={quickAccessRoutes.LOG} />
      <QuickAccessTitle>{t('quickaccess:menu.health-data')}</QuickAccessTitle>
      <div className={'qa-health__actions'}>
        {options.map((option) => (
          <QuickAccessAction key={option.route} {...option} />
        ))}
      </div>
    </Styles>
  )
}

export default QuickAccessLogHealth
