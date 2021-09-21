import { CaretDownIcon } from '../../../assets/media/icons'
import Tabs from '../../../components/tabs/tabs.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import ClientInfoMobile from '../components/client-info-mobile/client-info-mobile.component'
import LogDropdown from '../components/log-dropdown/log-dropdown.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import { PROGRESS_SECTIONS } from '../progress.constants'
import { HeaderAction, Wrapper } from './progress-mobile.styles'

export default function ProgressMobile() {
  const { t } = useTranslation()
  const { type } = useAuth()
  const isMobile = useIsMobile()

  const renderHealthData = () => {
    return <HealthData />
  }

  const renderMeasurements = () => {
    return <div>123</div>
  }

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
      <Wrapper>
        {type !== userTypes.CLIENT && <ClientInfoMobile />}

        <Tabs
          className={type !== userTypes.CLIENT ? '' : 'health__tabs'}
          tabs={[
            {
              label: t('progress:sections.health_data'),
              renderContent: renderHealthData,
              key: PROGRESS_SECTIONS.HEALTH_DATA
            },
            {
              label: t('progress:sections.measurements'),
              renderContent: renderMeasurements,
              key: PROGRESS_SECTIONS.MEASUREMENTS
            }
          ]}
        />
      </Wrapper>
    </MobilePage>
  )
}
