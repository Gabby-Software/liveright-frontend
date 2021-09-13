import { FC, useState } from 'react'
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
import { getRoute } from '../../../utils/routes'
import LogClient from '../../progress-log/log-health-data/components/log-client/log-client.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import SwitchClient from '../components/switch-client/switch-client.component'
import { ProgressSectionsType } from '../progress.types'
import { Wrapper } from './progress-desktop.styles'

interface Props {
  onLogClick: (value: ProgressSectionsType) => void
}

const ProgressDesktop: FC<Props> = () => {
  // const { onLogClick } = props
  const { t } = useTranslation()
  const { type } = useAuth()
  const [switchDialog, setSwitchDialog] = useState(false)
  const params = useParams<any>()

  return (
    <>
      <Wrapper>
        <MobileBack
          to={Routes.PROGRESS_CLIENTS}
          alias="progress"
          component={
            <Button className="progress__header-btn">
              Log Data
              <CaretDownIcon />
            </Button>
          }
        />

        {type !== userTypes.CLIENT && (
          <LogClient onSwitch={() => setSwitchDialog(true)} />
        )}
        <RoutedTabs
          tabs={[
            {
              name: t('progress:sections.measurements'),
              url: getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })
            },
            {
              name: t('progress:sections.health_data'),
              url: getRoute(Routes.PROGRESS_HEALTH_DATA, { id: params.id })
            }
          ]}
        />
        <Route path={Routes.PROGRESS_MEASUREMENTS}>TBD</Route>
        <Route path={Routes.PROGRESS_HEALTH_DATA}>
          <HealthData />
        </Route>
      </Wrapper>

      <SwitchClient
        open={switchDialog}
        onClose={() => setSwitchDialog(false)}
      />
    </>
  )
}

export default ProgressDesktop
