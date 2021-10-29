import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useTitle } from '../../hooks/title.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { DashboardCalendar } from './components/dashboard-calendar/dashboard-calendar.component'
import { DashboardClients } from './components/dashboard-clients/dashboard-clients.component'
import { DashboardLatest } from './components/dashboard-latest/dashboard-latest.component'
import { QuickLinks } from './components/dashboard-quick-links/dashboard-quick-links.component'
import { DashboardRevenue } from './components/dashboard-revenue/dashboard-revenue.component'
import Styles, { Container, ContainerGrid } from './dashboard.styles'
const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const Dashboard = () => {
  const isMobile = useIsMobile()
  const { first_name, last_name, type } = useAuth()
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
  if (type === userTypes.CLIENT) {
    return <div>{text}</div>
  }

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
