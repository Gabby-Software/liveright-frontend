import { useIsMobile } from '../../hooks/is-mobile.hook'
import ClientProfileDesktop from './client-profile-desktop/client-profile-desktop.component'
import ClientProfileMobile from './client-profile-mobile/client-profile-mobile.component'

export default function ClientProfile() {
  const isMobile = useIsMobile()
  return isMobile ? <ClientProfileMobile /> : <ClientProfileDesktop />
}
