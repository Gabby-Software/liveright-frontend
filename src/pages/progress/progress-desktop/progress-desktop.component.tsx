import { useState } from 'react'
import { useParams } from 'react-router'
import { Route } from 'react-router-dom'

import { CaretDownIcon } from '../../../assets/media/icons'
import Button from '../../../components/buttons/button/button.component'
import MobileBack from '../../../components/mobile-back/mobile-back.component'
import RoutedTabs from '../../../components/routed-tabs/routed-tabs.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { getViewRoutes } from '../../../utils/api/progress'
import LogClient from '../../progress-log/log-health-data/components/log-client/log-client.component'
import Goals from '../components/goals/goals.component'
import LogDropdown from '../components/log-dropdown/log-dropdown.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import SwitchClient from '../components/switch-client/switch-client.component'
import { Wrapper } from './progress-desktop.styles'

export default function ProgressDesktop() {
  const { t } = useTranslation()
  const { type } = useAuth()
  const [switchDialog, setSwitchDialog] = useState(false)
  const params = useParams<any>()

  const { measurementsTo, goalsTo, healthTo } = getViewRoutes(params, type)

  const dropdown = (
    <LogDropdown>
      <Button className="progress__header-btn">
        Log Data
        <CaretDownIcon />
      </Button>
    </LogDropdown>
  )

  return (
    <>
      <Wrapper>
        {type === userTypes.CLIENT ? (
          <div className="progress__title-container">
            <h2 className="progress__title">Progress & Metrics</h2>

            {dropdown}
          </div>
        ) : (
          <MobileBack
            to={Routes.PROGRESS_CLIENTS}
            alias="progress"
            component={dropdown}
          />
        )}

        {type !== userTypes.CLIENT && (
          <LogClient onSwitch={() => setSwitchDialog(true)} />
        )}

        <RoutedTabs
          tabs={[
            {
              name: t('progress:sections.measurements'),
              url: measurementsTo
            },
            {
              name: t('progress:sections.health_data'),
              url: healthTo
            },
            {
              name: t('progress:sections.goals'),
              url: goalsTo
            }
          ]}
        />
        <Route path={Routes.PROGRESS_MEASUREMENTS}>TBD</Route>
        <Route
          path={[
            Routes.PROGRESS_HEALTH_DATA,
            Routes.PROGRESS_CLIENT_HEALTH_DATA
          ]}
        >
          <HealthData />
        </Route>
        <Route path={[Routes.PROGRESS_GOALS, Routes.PROGRESS_CLIENT_GOALS]}>
          <Goals />
        </Route>
      </Wrapper>

      <SwitchClient
        open={switchDialog}
        onClose={() => setSwitchDialog(false)}
      />
    </>
  )
}
