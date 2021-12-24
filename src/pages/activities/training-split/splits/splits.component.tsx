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
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getRoute } from '../../../../utils/routes'
import PlanCard from '../../components/plan-card/plan-card.component'
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
    id: 1,
    name: '10 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight Now',
    training_plan: 'Train Had Intensity',
    scheduled_start_on: '',
    scheduled_end_on: '',
    status: 'draft'
  },
  {
    id: 2,
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight Now',
    training_plan: 'Train Had Intensity',
    scheduled_start_on: '2022-01-07',
    scheduled_end_on: '',
    status: 'inactive'
  },
  {
    id: 3,
    name: '7 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight Now',
    training_plan: 'Train Had Intensity',
    scheduled_start_on: '2022-01-15',
    scheduled_end_on: '2022-01-20',
    status: 'scheduled'
  },
  {
    id: 4,
    name: '7 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    diet_plan: 'Lose Weight',
    training_plan: 'Train Had Intensity',
    scheduled_start_on: '2021-12-21',
    scheduled_end_on: '',
    status: 'active'
  }
]

export default function TrainingSplits() {
  const isMobile = useIsMobile()

  const content = (
    <Styles>
      <Card className="PlansTable__card">
        {!isMobile && (
          <>
            <MobileBack
              to="/"
              alias="current-plan"
              className="PlansTable__back"
            />

            <div className="PlansTable__title-container">
              <Title>Training Splits</Title>

              <div>
                <Button to={Routes.ACTIVITIES_TS_NEW}>Create New Split</Button>
              </div>
            </div>
          </>
        )}

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
          {isMobile ? (
            <>
              {DATA.map((row, index) => (
                <PlanCard
                  plan={row}
                  key={index}
                  to={getRoute(Routes.ACTIVITIES_TS_ID, { id: row.id })}
                />
              ))}
            </>
          ) : (
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
          )}

          {!DATA.length && <EmptyPlaceholder spacing />}
        </div>
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Training Splits"
      actionComponent={
        <Button to={Routes.ACTIVITIES_TS_NEW}>Create Split</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}