import React, { FC } from 'react'

import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import QuickAccessBack from '../../../components/quick-access-back/quick-access-back.component'
import QuickAccessTitle from '../../../components/quick-access-title/quick-access-title.component'
import { quickAccessRoutes } from '../../../quick-access.routes'
import Styles from './quick-access-log-health-sleep.styles'

type Props = {}
const QuickAccessLogHealthSleep: FC<Props> = ({}) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <QuickAccessBack
        label={'health-data'}
        route={quickAccessRoutes.LOG_HEALTH_DATA}
      />
      <QuickAccessTitle>{t('quickaccess:log-sleep')}</QuickAccessTitle>
    </Styles>
  )
}

export default QuickAccessLogHealthSleep
