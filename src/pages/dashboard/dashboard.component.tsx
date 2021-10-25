import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useTitle } from '../../hooks/title.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { DashboardCalendar } from './components/dashboard-calendar/dashboard-calendar.component'
import { DashboardClients } from './components/dashboard-clients/dashboard-clients.component'
import { DashboardLatest } from './components/dashboard-latest/dashboard-latest.component'
import { QuickLinks } from './components/dashboard-quick-links/dashboard-quick-links.component'
import { DashboardRevenue } from './components/dashboard-revenue/dashboard-revenue.component'
import Styles, { ContainerGrid } from './dashboard.styles'

const Dashboard = () => {
  const isMobile = useIsMobile()
  const { first_name, last_name } = useAuth()
  useTitle(`Hello, ${first_name} ${last_name}`)

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
