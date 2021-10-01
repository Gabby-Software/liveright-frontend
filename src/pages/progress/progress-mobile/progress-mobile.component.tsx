import { CaretDownIcon } from '../../../assets/media/icons'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { isClient } from '../../../utils/api/auth'
import ClientInfoMobile from '../components/client-info-mobile/client-info-mobile.component'
import Content from '../components/content/content.component'
import LogDropdown from '../components/log-dropdown/log-dropdown.component'
import { HeaderAction, Wrapper } from './progress-mobile.styles'

export default function ProgressMobile() {
  const { type } = useAuth()
  const isMobile = useIsMobile()

  return (
    <MobilePage
      title="Client Progress"
      headerTopComponent={
        !isClient(type) && (
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

        <Content />
      </Wrapper>
    </MobilePage>
  )
}
