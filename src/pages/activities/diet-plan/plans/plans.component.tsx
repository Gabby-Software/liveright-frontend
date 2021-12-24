import moment from 'moment'
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
import useDietPlans from '../../../../hooks/api/activities/useDietPlans'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import PlanCard from '../../components/plan-card/plan-card.component'
import { Styles } from '../../styles/plans-table.styles'
import AddDietPlan from '../add-plan/add-plan.component'

const LABELS = ['Diet Plan Name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

export default function DietPlans() {
  const isMobile = useIsMobile()
  const [add, setAdd] = useState(false)

  const { isLoading, dietPlans } = useDietPlans()

  if (add) {
    return <AddDietPlan onClose={() => setAdd(false)} />
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
              <Title>Diet Plans</Title>

              <div>
                <Button onClick={() => setAdd(true)}>Create New Plan</Button>
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
              {dietPlans.map((row, index) => (
                <PlanCard
                  plan={row}
                  key={index}
                  to={getRoute(Routes.ACTIVITIES_DP_ID, {
                    id: row._id,
                    revisionId: row.revisions?.[row.revisions?.length - 1]?._id
                  })}
                />
              ))}
            </>
          ) : (
            <DataTable
              labels={LABELS}
              data={dietPlans}
              keys={KEYS}
              round="10px"
              render={{
                name: (row) => (
                  <Link
                    className="PlansTable__table-link"
                    to={getRoute(Routes.ACTIVITIES_DP_ID, {
                      id: row._id,
                      revisionId:
                        row.revisions?.[row.revisions?.length - 1]?._id
                    })}
                  >
                    <span>{row.name}</span>
                  </Link>
                ),
                client: () => <span>-</span>,
                days: () => <span>-</span>,
                start: (row) => (
                  <span>
                    {row.scheduled_start_on
                      ? moment(new Date(row.scheduled_start_on)).format(
                          DATE_RENDER_FORMAT
                        )
                      : '-'}
                  </span>
                ),
                end: (row) => (
                  <span>
                    {row.scheduled_end_on
                      ? moment(new Date(row.scheduled_end_on)).format(
                          DATE_RENDER_FORMAT
                        )
                      : '-'}
                  </span>
                ),
                status: (row) => (
                  <StatusBadge
                    status={row.status.toLowerCase()}
                    className="PlansTable__table-status"
                  >
                    {capitalize(row.status)}
                  </StatusBadge>
                )
              }}
            />
          )}

          {isLoading && <LoadingPlaceholder spacing />}
          {!dietPlans.length && !isLoading && <EmptyPlaceholder spacing />}
        </div>
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Diet Plans"
      actionComponent={
        <Button onClick={() => setAdd(true)}>Create Plan</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
