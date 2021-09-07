import React from 'react'
import { Route } from 'react-router-dom'

import RoutedTabs from '../../../components/routed-tabs/routed-tabs.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useTitleContent } from '../../../layouts/desktop-layout/desktop-layout.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import LogClient from '../../progress-log/log-health-data/components/log-client/log-client.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import TitleButton from '../components/progress-title-button/progress-title-button.component'
import { ProgressSectionsType } from '../progress.types'
import { Wrapper } from './progress-desktop.styles'
interface Props {
  onLogClick: (value: ProgressSectionsType) => void
}

const ProgressDesktop: React.FC<Props> = (props) => {
  const { onLogClick } = props
  const { t } = useTranslation()
  const { type } = useAuth()

  useTitleContent(<TitleButton onMenuClick={onLogClick} />)

  return (
    <Wrapper>
      {type === userTypes.CLIENT ? null : <LogClient />}
      <RoutedTabs
        tabs={[
          {
            name: t('progress:sections.measurements'),
            url: Routes.PROGRESS_MEASUREMENTS
          },
          {
            name: t('progress:sections.health_data'),
            url: Routes.PROGRESS_HEALTH_DATA
          }
        ]}
      />
      <Route path={Routes.PROGRESS_MEASUREMENTS}>TBD</Route>
      <Route path={Routes.PROGRESS_HEALTH_DATA}>
        <HealthData />
      </Route>
    </Wrapper>
  )
}

export default ProgressDesktop
