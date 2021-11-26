import { Link } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import DataTable from '../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { EmptyPlaceholder } from '../../../../components/placeholders'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import { Styles } from './plans.styles'

const LABELS = ['Diet Plan Name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

const DATA = [
  {
    name: '10 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Inactive'
  },
  {
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Active'
  },
  {
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Draft'
  },
  {
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Scheduled'
  }
]

export default function DietPlans() {
  return (
    <Styles>
      <Card>
        <MobileBack to="/" alias="current-plan" className="DietPlans__back" />

        <div className="DietPlans__title-container">
          <Title>Diet Plans</Title>

          <div>
            <Button>Create New Plan</Button>
          </div>
        </div>

        <div className="DietPlans__filters">
          <ClientSelect
            id="DietPlans-client"
            onChange={() => {}}
            placeholder="All Client"
            className="DietPlans__select"
          />

          <Select
            id="DietPlans-statuses"
            options={[]}
            placeholder="All Status"
            className="DietPlans__select"
          />
        </div>

        <div>
          <DataTable
            labels={LABELS}
            data={DATA}
            keys={KEYS}
            round="10px"
            render={{
              name: (row) => (
                <Link
                  to={`${Routes.ACTIVITIES_DP}/${row.id}`}
                  className="DietPlans__table-link"
                >
                  <span>{row.name}</span>
                </Link>
              ),
              status: (row) => (
                <StatusBadge
                  status={row.status.toLowerCase()}
                  className="DietPlans__table-status"
                >
                  {row.status}
                </StatusBadge>
              )
            }}
          />

          {!DATA.length && <EmptyPlaceholder spacing />}
        </div>
      </Card>
    </Styles>
  )
}
