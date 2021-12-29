import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
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
import useClientAccount from '../../../../hooks/api/accounts/useClientAccount'
import useTrainingPlans from '../../../../hooks/api/activities/useTrainingPlans'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import PlanCard from '../../components/plan-card/plan-card.component'
import { Styles } from '../../styles/plans-table.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'

const LABELS = ['Plan name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

export default function TrainingPlans() {
  const isMobile = useIsMobile()
  const { clientId } = useParams<{ clientId: any }>()
  const history = useHistory()
  const [add, setAdd] = useState(false)
  const { isLoading, trainingPlans, mutate } = useTrainingPlans({ clientId })
  const clientAccount = useClientAccount(clientId)

  useEffect(() => {
    if (!clientId) {
      history.push(`${Routes.ACTIVITIES}?return=${Routes.ACTIVITIES_TP}`)
    }
  }, [clientId])

  if (add) {
    return (
      <AddTrainingPlan
        onClose={() => {
          setAdd(false)
          mutate()
        }}
      />
    )
  }

  const content = (
    <Styles>
      <ActivitiesClient
        viewActivity={false}
        clientId={clientId}
        onClientSwitch={(id) => {
          history.push(getRoute(Routes.ACTIVITIES_TP, { clientId: id }))
        }}
      />
      <Card className="PlansTable__card">
        {!isMobile && (
          <>
            <Link to={Routes.ACTIVITIES}>
              <GoBack spacing={2}>Go back to Activities</GoBack>
            </Link>

            <div className="PlansTable__title-container">
              <Title>Training Plans</Title>

              <div>
                <Button onClick={() => setAdd(true)}>Create New Plan</Button>
              </div>
            </div>
          </>
        )}

        {trainingPlans.length ? (
          <>
            <div className="PlansTable__filters">
              <ClientSelect
                value={clientId}
                id="training-plans-client"
                onChange={(e) =>
                  history.push(getRoute(Routes.ACTIVITIES_TP, { clientId: e }))
                }
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
                      to={getRoute(Routes.ACTIVITIES_TP_ID, {
                        clientId: clientId,
                        id: row._id,
                        revisionId: getRevision(row)?._id
                      })}
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
                        to={getRoute(Routes.ACTIVITIES_TP_ID, {
                          clientId: clientId,
                          id: row._id,
                          revisionId: getRevision(row)?._id
                        })}
                        className="PlansTable__table-link"
                      >
                        <span>{row.name || '-'}</span>
                      </Link>
                    ),
                    client: () => (
                      <span>
                        {clientId ? clientAccount.user?.full_name || '-' : '-'}
                      </span>
                    ),
                    days: (row) => <span>{getRevision(row)?.days_count}</span>,
                    start: (row) => (
                      <span>
                        {getRevision(row)?.scheduled_start_on
                          ? moment(
                              new Date(getRevision(row)?.scheduled_start_on)
                            ).format(DATE_RENDER_FORMAT)
                          : '-'}
                      </span>
                    ),
                    end: (row) => (
                      <span>
                        {getRevision(row)?.scheduled_end_on
                          ? moment(
                              new Date(getRevision(row).scheduled_end_on)
                            ).format(DATE_RENDER_FORMAT)
                          : '-'}
                      </span>
                    ),
                    status: (row) => (
                      <StatusBadge
                        status={getRevision(row)?.status.toLowerCase()}
                        className="PlansTable__table-status"
                      >
                        {capitalize(getRevision(row)?.status)}
                      </StatusBadge>
                    )
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <div>
            {isLoading ? (
              <LoadingPlaceholder spacing />
            ) : (
              <EmptyPlaceholder
                spacing
                icon
                text="There is no training plan yet... "
                action={
                  isMobile ? (
                    <Button onClick={() => setAdd(true)}>
                      Create Training Plan
                    </Button>
                  ) : undefined
                }
              />
            )}
          </div>
        )}
      </Card>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Plans"
      actionComponent={
        trainingPlans.length > 0 ? (
          <Button onClick={() => setAdd(true)}>Create Plan</Button>
        ) : null
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

function getRevision(row: any) {
  return row.revisions?.[row.revisions?.length - 1]
}
