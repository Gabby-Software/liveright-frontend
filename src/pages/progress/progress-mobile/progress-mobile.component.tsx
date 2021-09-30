import { useParams } from 'react-router'
import { Route } from 'react-router-dom'

import { CaretDownIcon } from '../../../assets/media/icons'
import RoutedTabs from '../../../components/routed-tabs/routed-tabs.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { getViewRoutes } from '../../../utils/api/progress'
import ClientInfoMobile from '../components/client-info-mobile/client-info-mobile.component'
import Goals from '../components/goals/goals.component'
import LogDropdown from '../components/log-dropdown/log-dropdown.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import { HeaderAction, Wrapper } from './progress-mobile.styles'
import { isClient } from '../../../utils/api/auth'

export default function ProgressMobile() {
  const { t } = useTranslation()
  const { type } = useAuth()
  const params = useParams<any>()
  const isMobile = useIsMobile()

  const { measurementsTo, goalsTo, healthTo } = getViewRoutes(params, type)

  return (
    <MobilePage
      title="Client Progress"
      headerTopComponent={
        type === userTypes.CLIENT ? undefined : (
          <HeaderLink to={Routes.PROGRESS_CLIENTS}>
            Return to Progress & Metrics
          </HeaderLink>
        )
      }
      actionComponent={
        <LogDropdown>
          <HeaderAction>
            Log Data
            <CaretDownIcon />
          </HeaderAction>
        </LogDropdown>
      }
      headerSpacing={isMobile && type === userTypes.CLIENT ? 12 : 25}
    >
      <Wrapper $client={isClient(type)}>
        {type !== userTypes.CLIENT && <ClientInfoMobile />}

        <RoutedTabs
          className="health__tabs"
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
    </MobilePage>
  )
}
