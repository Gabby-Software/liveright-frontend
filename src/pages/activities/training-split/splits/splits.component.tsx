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
import useTrainingSplits from '../../../../hooks/api/activities/useTrainingSplits'
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

function getLatestRevision(plan: any) {
  return plan?.revisions?.[plan.revisions?.length - 1]
}

export default function TrainingSplits() {
  const isMobile = useIsMobile()

  const { trainingSplits, isLoading } = useTrainingSplits()

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
              {trainingSplits.map((row, index) => (
                <PlanCard
                  plan={row}
                  key={index}
                  to={getRoute(Routes.ACTIVITIES_TS_ID, {
                    id: row._id,
                    revisionId: getLatestRevision(row)._id
                  })}
                />
              ))}
            </>
          ) : (
            <DataTable
              labels={LABELS}
              data={trainingSplits}
              keys={KEYS}
              loading={isLoading}
              round="10px"
              render={{
                name: (row) => (
                  <Link
                    to={getRoute(Routes.ACTIVITIES_TS_ID, {
                      id: row._id,
                      revisionId: getLatestRevision(row)._id
                    })}
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
                ),
                client: (row) =>
                  `${row.account?.user?.first_name} ${row.account?.user?.last_name}`,
                days: (row) => getLatestRevision(row)?.days_count
              }}
            />
          )}

          {!trainingSplits.length && <EmptyPlaceholder spacing />}
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
