import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import Styles from './dashboard.styles'
import { QuickLinks } from './components/quick-links/quick-links.component'

const Dashboard = () => {
  const isMobile = useIsMobile()

  const content = (
    <Styles>
      <QuickLinks />
    </Styles>
  )

  return isMobile ? (
    <MobilePage title="Dashboard" headerNavChat>
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default Dashboard
