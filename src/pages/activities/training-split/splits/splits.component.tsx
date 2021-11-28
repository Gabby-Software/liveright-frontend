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
import { Styles } from '../../styles/plans-table.styles'

const LABELS = [
  'Split Name',
  'Diet Plan',
  'Training Plan',
  'Client',
  'Days',
  'Status'
]
const KEYS = ['name', 'diet_plan', 'training_plan', 'client', 'days', 'status']

const DATA = [
  {
    name: '10 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight Now',
    training_plan: 'Train Had Intensity',
    status: 'Inactive'
  },
  {
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight Now',
    training_plan: 'Train Had Intensity',
    status: 'Active'
  }
]

export default function TrainingSplits() {
  return (
    <Styles>
      <Card>
        <MobileBack to="/" alias="current-plan" className="PlansTable__back" />

        <div className="PlansTable__title-container">
          <Title>Training Splits</Title>

          <div>
            <Button>Create New Split</Button>
          </div>
        </div>

        <div className="PlansTable__filters">
          <ClientSelect
            id="DietPlans-client"
            onChange={() => {}}
            placeholder="All Client"
            className="PlansTable__select"
          />

          <Select
            id="DietPlans-statuses"
            options={[]}
            placeholder="All Status"
            className="PlansTable__select"
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
                  to={`${Routes.ACTIVITIES_TS}/${row.id}`}
                  className="PlansTable__table-link"
                >
                  <span>{row.name}</span>
                </Link>
              ),
              status: (row) => (
                <StatusBadge
                  status={row.status.toLowerCase()}
                  className="PlansTable__table-status"
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
