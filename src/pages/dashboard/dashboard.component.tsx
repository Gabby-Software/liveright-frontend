import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useTitle } from '../../hooks/title.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import Measurements from '../progress/components/measurements/measurements.component'
import { DashboardCalendar } from './components/dashboard-calendar/dashboard-calendar.component'
import { DashboardClients } from './components/dashboard-clients/dashboard-clients.component'
import { DashboardLatest } from './components/dashboard-latest/dashboard-latest.component'
import { QuickLinks } from './components/dashboard-quick-links/dashboard-quick-links.component'
import { DashboardRevenue } from './components/dashboard-revenue/dashboard-revenue.component'
import Styles, { Container, ContainerGrid } from './dashboard.styles'

const Dashboard = () => {
  const isMobile = useIsMobile()
  const { first_name, last_name, type } = useAuth()
  useTitle(`Hello, ${first_name} ${last_name}`)

  const content =
    type === userTypes.CLIENT ? (
      <Styles>
        <ContainerGrid>
          <DashboardLatest />
          <DashboardCalendar />
          <Measurements isDashboard />
        </ContainerGrid>
      </Styles>
    ) : (
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
    <MobilePage
      title={`Hello, ${first_name} ${last_name}`}
      headerComponent={<Container />}
      headerNavChat
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default Dashboard
