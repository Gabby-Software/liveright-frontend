import { useIsMobile } from '../../hooks/is-mobile.hook'
import Content from './components/content/content.component'
import NotificationsMobile from './components/notifications-mobile.component'

type Props = {}

const Notifications = ({}: Props) => {
  const isMobile = useIsMobile()
  return isMobile ? <NotificationsMobile /> : <Content />
}

export default Notifications
