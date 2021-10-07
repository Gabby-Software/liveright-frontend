import { useParams } from 'react-router'
import { Route } from 'react-router-dom'

import RoutedTabs from '../../../../components/routed-tabs/routed-tabs.component'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getViewRoutes } from '../../../../utils/api/progress'
import Goals from '../goals/goals.component'
import Measurements from '../measurements/measurements.component'
import HealthData from '../progress-health-data/progress-health-data.component'
import { Styles } from './content.styles'

const CONTENT = [
  {
    path: [Routes.PROGRESS_MEASUREMENTS, Routes.PROGRESS_CLIENT_MEASUREMENTS],
    Component: Measurements
  },
  {
    path: [Routes.PROGRESS_HEALTH_DATA, Routes.PROGRESS_CLIENT_HEALTH_DATA],
    Component: HealthData
  },
  {
    path: [Routes.PROGRESS_GOALS, Routes.PROGRESS_CLIENT_GOALS],
    Component: Goals
  }
]

export default function Content() {
  const { t } = useTranslation()
  const params = useParams<any>()
  const isMobile = useIsMobile()
  const { type } = useAuth()
  const { measurementsTo, goalsTo, healthTo } = getViewRoutes(params, type)

  return (
    <Styles>
      <RoutedTabs
        variant="secondary"
        indicator={!isMobile}
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

      {CONTENT.map((content, index) => (
        <Route key={index} path={content.path}>
          <content.Component />
        </Route>
      ))}
    </Styles>
  )
}
