// import Clients from '../../../clients/clients.component'
import Button from '../../../../components/buttons/button/button.component'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import {
  SearchIcon,
  OptionsIcon,
  ClientCheckedIcon,
  ClientIcon
} from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { Styles } from './dashboard-clients.styles'

const options = (
  <div className="icons">
    <ClientIcon />
    <OptionsIcon />
  </div>
)

const MOCK_DATA = [
  {
    name: 'John Travolta',
    phone_number: '+33 3218 41421',
    sessions: '4',
    options
  },
  {
    name: 'John Travolta',
    phone_number: '+33 3218 41421',
    sessions: '4',
    options
  },
  {
    name: 'John Travolta',
    phone_number: '+33 3218 41421',
    sessions: '4',
    options
  },
  {
    name: 'John Travolta',
    phone_number: '+33 3218 41421',
    sessions: '4',
    options
  }
]

const KEYS: string[] = ['name', 'phone_number', 'sessions', 'options']
const LABELS: string[] = [
  'clients:Client',
  'profile:Phone Number',
  'profile:Sessions',
  'profile:Options'
]

export const DashboardClients = () => {
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
        />
        <Select
          id="clients-status"
          options={[]}
          placeholder="Filter By Client"
          className="wrapper-select"
        />
      </div>
      <TableWrapper labels={LABELS} keys={KEYS} data={MOCK_DATA} />

      <Button className="open-all-button">
        <ClientCheckedIcon />
        Open All
      </Button>
    </Styles>
  )
}
