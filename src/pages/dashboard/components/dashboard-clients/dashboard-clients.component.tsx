import { Link } from 'react-router-dom'

import {
  GroupDashboardIcon,
  SearchIcon,
  OptionSolidIcon,
  ProfileCheckTrainerIcon,
  PhoneSolidIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Input from '../../../../components/form/input/input.component'
import { Routes } from '../../../../enums/routes.enum'
import useClientsPaginate from '../../../../hooks/api/clients/useClientsPaginate'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { DashboardButton } from '../dashboard-button/dashboard-button.component'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import { List, Styles } from './dashboard-clients.styles'

const KEYS: string[] = ['name', 'email', 'phone_number', 'sessions', 'actions']
const LABELS: string[] = [
  'clients:client-name',
  'profile:email',
  'profile:phone',
  'profile:sessions',
  'profile:Actions'
]

export const DashboardClients = () => {
  const { clients, onSearch } = useClientsPaginate({
    status: 'active'
  })

  const isMobile = useIsMobile()
  // if (isMobile) {
  //   return <div>Mobile</div>
  // }
  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">Your Clients</h2>
        <Button className="wrapper-button">
          <Link to={Routes.CLIENTS + '?show_drawer=true'}>+ Add New</Link>
        </Button>
      </div>
      <div className="wrapper">
        <Input
          id="clients-search"
          placeholder="Search"
          prefix={<SearchIcon />}
          className="wrapper-search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {isMobile ? (
        <ClientsList clients={clients.slice(0, 4)} />
      ) : (
        <TableWrapper labels={LABELS} keys={KEYS} data={clients.slice(0, 4)} />
      )}

      <DashboardButton>
        <Link to={Routes.CLIENTS}>
          <GroupDashboardIcon />
          Open All
        </Link>
      </DashboardButton>
    </Styles>
  )
}

function ClientsList({ clients }: { clients: any[] }) {
  return (
    <List>
      {clients.map((item) => (
        <li key={item.id} className="item">
          <div className="item-wrapper">
            <p className="item-wrapper__name">{`${item.first_name} ${item.last_name}`}</p>
            <div className="item-wrapper__property">
              <p className="item-wrapper__property-number">
                <PhoneSolidIcon />
                {item.phone_number ? item.phone_number : '+33 3333 33333'}
              </p>
              <p className="item-wrapper__property-sessions">
                <ProfileCheckTrainerIcon />
                {`${item.extras.credits} Sessions`}
              </p>
            </div>
          </div>
          <div className="item-wrapper__icon">
            <OptionSolidIcon />
          </div>
        </li>
      ))}
    </List>
  )
}
