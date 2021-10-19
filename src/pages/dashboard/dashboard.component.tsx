import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import Styles, { ContainerGrid } from './dashboard.styles'
import { QuickLinks } from './components/quick-links/quick-links.component'
import { DashboardClients } from './components/dashboard-clients/dashboard-clients.component'
import { DashboardCalendar } from './components/dashboard-colendar/dashboard-colendar.component'
import { DashboardLatest } from './components/dashboard-latest/dashboard-latest.component'
import { DashboardRevenue } from './components/dashboard-revenue/dashboard-revenue.component'

const Dashboard = () => {
  const isMobile = useIsMobile()

  const content = (
    <Styles>
      <QuickLinks />
      <ContainerGrid>
        <DashboardCalendar />
        <DashboardRevenue />
        <DashboardLatest />
        <DashboardClients />
      </ContainerGrid>
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
