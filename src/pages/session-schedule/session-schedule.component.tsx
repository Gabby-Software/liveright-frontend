import CreditsButton from '../../components/buttons/credits-button/credits-button.component'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import AddSessionMobile from '../sessions/sections/add-session/add-session-mobile/add-session-mobile.component'
import { HeaderComponent } from './session-schedule.styles'

export default function SessionSchedule() {
  const { t } = useTranslation()
  return (
    <MobilePage
      title={t('sessions:schedule-session')}
      headerTopComponent={
        <HeaderLink to="/sessions">{t('sessions:back-to-sessions')}</HeaderLink>
      }
      headerComponent={
        <HeaderComponent>
          <CreditsButton count={4} />
        </HeaderComponent>
      }
    >
      <AddSessionMobile onClose={() => {}} />
    </MobilePage>
  )
}
