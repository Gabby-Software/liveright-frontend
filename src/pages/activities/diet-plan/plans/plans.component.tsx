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

const LABELS = ['Diet Plan Name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

const DATA = [
  {
    id: 1,
    name: '10 Days of Wonder',
    client: 'John Travolta',
    days: '5',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Inactive'
  },
  {
    id: 2,
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Draft'
  },
  {
    id: 4,
    name: 'Reduce Bodyweight',
    client: 'John Travolta',
    days: '7',
    start: '04/10/2021',
    end: '04/10/2021',
    status: 'Scheduled'
  }
]

export default function DietPlans() {
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
              <Title>Diet Plans</Title>

              <div>
                <Button>Create New Plan</Button>
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
                  to={getRoute(Routes.ACTIVITIES_DP_ID, { id: row.id })}
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
                    to={`${Routes.ACTIVITIES_DP}/${row.id}`}
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
      title="Diet Plans"
      actionComponent={<Button>Create Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
