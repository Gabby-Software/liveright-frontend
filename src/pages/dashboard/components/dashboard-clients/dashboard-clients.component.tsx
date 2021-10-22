import { Link } from 'react-router-dom'
import Button from '../../../../components/buttons/button/button.component'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import { SearchIcon, ClientCheckedIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
// import Select from '../../../../components/form/select/select.component'
import { Styles } from './dashboard-clients.styles'
import useClientsPaginate from '../../../../hooks/api/clients/useClientsPaginate'
import { Routes } from '../../../../enums/routes.enum'

const KEYS: string[] = ['name', 'email', 'phone_number', 'sessions', 'actions']
const LABELS: string[] = [
  'clients:client-name',
  'profile:email',
  'profile:phone',
  'profile:sessions',
  'profile:Actions'
]

export const DashboardClients = () => {
  const { clients, isLoading, meta, onSearch, onPage, mutate } =
    useClientsPaginate({
      status: 'active'
    })
  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">Your Clients</h2>
        <Button className="wrapper-button">Add New</Button>
      </div>
      <div className="wrapper">
        <Input
          id="clients-search"
          placeholder="Search"
          prefix={<SearchIcon />}
          className="wrapper-search"
          onChange={(e) => onSearch(e.target.value)}
        />
        {/* <Select
          id="clients-status"
          options={[]}
          placeholder="Filter By Client"
          className="wrapper-select"
        /> */}
      </div>
      <TableWrapper labels={LABELS} keys={KEYS} data={clients} />

      <Button className="open-all-button">
        <Link to={Routes.CLIENTS}>
          <ClientCheckedIcon />
          Open All
        </Link>
      </Button>
    </Styles>
  )
}
