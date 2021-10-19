import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import Styles from './dashboard.styles'

const Dashboard = () => {
  const isMobile = useIsMobile()

  const content = <Styles></Styles>

  return isMobile ? (
    <MobilePage title="Dashboard" headerNavChat>
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default Dashboard
