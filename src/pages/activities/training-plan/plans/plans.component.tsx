import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import DataTable from '../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTrainingPlans from '../../../../hooks/api/activities/useTrainingPlans'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getRoute } from '../../../../utils/routes'
import PlanCard from '../../components/plan-card/plan-card.component'
import { Styles } from '../../styles/plans-table.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'

const LABELS = ['Plan name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

export default function TrainingPlans() {
  const isMobile = useIsMobile()
  const [add, setAdd] = useState(false)

  const { isLoading, trainingPlans } = useTrainingPlans()

  if (add) {
    return <AddTrainingPlan onClose={() => setAdd(false)} />
  }

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
              <Title>Training Plans</Title>

              <div>
                <Button onClick={() => setAdd(true)}>Create New Plan</Button>
              </div>
            </div>
          </>
        )}

        <div className="PlansTable__filters">
          <ClientSelect
            id="training-plans-client"
            onChange={() => {}}
            placeholder="All Client"
            className="PlansTable__select"
          />

          <Select
            id="training-plans-statuses"
            options={[]}
            placeholder="All Status"
            className="PlansTable__select"
          />
        </div>

        <div>
          {isMobile ? (
            <>
              {trainingPlans.map((row, index) => (
                <PlanCard
                  key={index}
                  plan={row}
                  to={getRoute(Routes.ACTIVITIES_TP_ID, { id: row.id })}
                />
              ))}
            </>
          ) : (
            <DataTable
              labels={LABELS}
              data={trainingPlans}
              keys={KEYS}
              round="10px"
              render={{
                name: (row) => (
                  <Link
                    to={`${Routes.ACTIVITIES_TP}/${row.id}`}
                    className="PlansTable__table-link"
                  >
                    <span>{row.name}</span>
                  </Link>
                ),
                client: () => <span>-</span>,
                days: () => <span>-</span>,
                start: (row) => <span>{row.scheduled_start_on || '-'}</span>,
                end: (row) => <span>{row.scheduled_end_on || '-'}</span>,
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

          {isLoading && <LoadingPlaceholder spacing />}
          {!trainingPlans.length && !isLoading && <EmptyPlaceholder spacing />}
        </div>
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Training Plans"
      actionComponent={<Button>Create Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
