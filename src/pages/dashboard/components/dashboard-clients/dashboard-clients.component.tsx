import { Link } from 'react-router-dom'

import { ClientCheckedIcon, SearchIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Input from '../../../../components/form/input/input.component'
import { Routes } from '../../../../enums/routes.enum'
import useClientsPaginate from '../../../../hooks/api/clients/useClientsPaginate'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import { Styles } from './dashboard-clients.styles'

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
  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">Your Clients</h2>
        <Button className="wrapper-button">
          <Link to={Routes.CLIENTS + '?show_drawer=true'}>Add New</Link>
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
      <TableWrapper labels={LABELS} keys={KEYS} data={clients.slice(0, 4)} />

      <Button className="open-all-button">
        <Link to={Routes.CLIENTS}>
          <ClientCheckedIcon />
          Open All
        </Link>
      </Button>
    </Styles>
  )
}
