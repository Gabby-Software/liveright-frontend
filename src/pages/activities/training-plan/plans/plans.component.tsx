import moment from 'moment'
import { useState } from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import Tooltip from '../../../../components/tooltip/tooltip.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useTrainingPlans from '../../../../hooks/api/activities/useTrainingPlans'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import {
  getActiveOrLatestRev,
  getStatus
} from '../../../../utils/api/activities'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import EmptyPlan from '../../components/empty-plan/empty-plan.component'
import PlanCard from '../../components/plan-card/plan-card.component'
import { Styles } from '../../styles/plans-table.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'

const LABELS = ['Plan name', 'Client', 'Days', 'Start', 'End', 'Status']
const KEYS = ['name', 'client', 'days', 'start', 'end', 'status']

export default function TrainingPlans() {
  const isMobile = useIsMobile()
  const { clientId } = useParams<{ clientId: any }>()
  const history = useHistory()
  const { type: userType } = useAuth()
  const [add, setAdd] = useState(false)
  const [status, setStatus] = useState('')
  const [sorting, setSorting] = useState<any>({
    sortKey: '',
    sortMethod: 0
  })
  const { isLoading, trainingPlans, mutate, meta, onPage } = useTrainingPlans({
    clientId,
    status
  })

  // useEffect(() => {
  //   if (!clientId) {
  //     history.push(`${Routes.ACTIVITIES}?return=${Routes.ACTIVITIES_TP}`)
  //   }
  // }, [clientId])

  if (
    (userType === userTypes.TRAINER && !clientId) ||
    (userType === userTypes.CLIENT && clientId === 'all')
  ) {
    return <Redirect to={Routes.HOME} />
  }

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

  const sortLogic = (a: any, b: any) => {
    let sortValue = 0
    switch (sorting?.sortKey) {
      case 'name':
        sortValue =
          a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase()) *
          sorting?.sortMethod
        break
      case 'client':
        sortValue =
          a?.account?.user?.full_name
            ?.toLowerCase()
            .localeCompare(b?.account?.user?.full_name?.toLowerCase()) *
          sorting?.sortMethod
        break
      case 'days':
        sortValue =
          getActiveOrLatestRev(a)
            ?.days_count?.toString()
            ?.localeCompare(getActiveOrLatestRev(b)?.days_count?.toString()) *
          sorting?.sortMethod
        break
      case 'start':
        sortValue =
          (getActiveOrLatestRev(a)?.scheduled_start_on
            ? getActiveOrLatestRev(a)?.scheduled_start_on
            : ''
          ).localeCompare(
            getActiveOrLatestRev(b)?.scheduled_start_on
              ? getActiveOrLatestRev(b)?.scheduled_start_on
              : ''
          ) * sorting?.sortMethod
        break
      case 'end':
        sortValue =
          (getActiveOrLatestRev(a)?.scheduled_end_on
            ? getActiveOrLatestRev(a)?.scheduled_end_on
            : ''
          ).localeCompare(
            getActiveOrLatestRev(b)?.scheduled_end_on
              ? getActiveOrLatestRev(b)?.scheduled_end_on
              : ''
          ) * sorting?.sortMethod
        break
      case 'status':
        sortValue =
          a?.status?.toLowerCase().localeCompare(b?.status?.toLowerCase()) *
          sorting?.sortMethod
        break
      default:
        break
    }
    return sortValue
  }

  const content =
    userType === userTypes.CLIENT && !trainingPlans.length ? (
      <Styles>
        <EmptyPlan
          title="Training Plans"
          text="There is no training plan yet..."
          Icon={WorkoutIcon}
          action={
            <Button onClick={() => setAdd(true)}>Create Training Plan</Button>
          }
        />
      </Styles>
    ) : (
      <Styles>
        {userType !== userTypes.CLIENT && (
          <ActivitiesClient
            viewActivity={false}
            clientId={clientId}
            onClientSwitch={(id) => {
              history.push(getRoute(Routes.ACTIVITIES_TP, { clientId: id }))
            }}
          />
        )}

        <Card className="PlansTable__card">
          {!isMobile && (
            <>
              <div className="PlansTable__title-container">
                <Title>Training Plans</Title>

                <div>
                  {clientId !== 'all' && (
                    <Button onClick={() => setAdd(true)}>
                      Create New Plan
                    </Button>
                  )}
                  {clientId === 'all' && (
                    <Tooltip title="Please select a client before creating a plan">
                      <Button>Create New Plan</Button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </>
          )}

          {isLoading ? (
            <LoadingPlaceholder spacing />
          ) : (
            <>
              <div className="PlansTable__filters">
                {userType !== userTypes.CLIENT && (
                  <ClientSelect
                    value={clientId}
                    id="training-plans-client"
                    onChange={(e) =>
                      history.push(
                        getRoute(Routes.ACTIVITIES_TP, { clientId: e })
                      )
                    }
                    placeholder="All Client"
                    className="PlansTable__select"
                  />
                )}

                <Select
                  id="training-plans-statuses"
                  options={[
                    { label: 'Any Status', value: '' },
                    { label: 'Active', value: 'active' },
                    { label: 'Scheduled', value: 'scheduled' },
                    { label: 'Inactive', value: 'inactive' }
                  ]}
                  value={status}
                  onChange={(value) => setStatus(value)}
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
                          clientId: row.account_id || clientId,
                          id: row._id,
                          revisionId: getActiveOrLatestRev(row)?._id
                        })}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <DataTable
                      labels={LABELS}
                      data={trainingPlans.sort(sortLogic)}
                      keys={KEYS}
                      sort={sorting}
                      setSort={setSorting}
                      round="10px"
                      render={{
                        name: (row) => (
                          <Link
                            to={getRoute(Routes.ACTIVITIES_TP_ID, {
                              clientId: row.account_id || clientId,
                              id: row._id,
                              revisionId: getActiveOrLatestRev(row)?._id
                            })}
                            className="PlansTable__table-link"
                          >
                            <span>{row.name || '-'}</span>
                          </Link>
                        ),
                        client: (row) => (
                          <span>
                            {row.account
                              ? [
                                  row.account?.user?.first_name,
                                  row.account?.user?.last_name
                                ]
                                  .filter(Boolean)
                                  .join(' ') || '-'
                              : '-'}
                          </span>
                        ),
                        days: (row) => (
                          <span>{getActiveOrLatestRev(row)?.days_count}</span>
                        ),
                        start: (row) => (
                          <span>
                            {getActiveOrLatestRev(row)?.scheduled_start_on
                              ? moment(
                                  new Date(
                                    getActiveOrLatestRev(
                                      row
                                    )?.scheduled_start_on
                                  )
                                ).format(DATE_RENDER_FORMAT)
                              : '-'}
                          </span>
                        ),
                        end: (row) => (
                          <span>
                            {getActiveOrLatestRev(row)?.scheduled_end_on
                              ? moment(
                                  new Date(
                                    getActiveOrLatestRev(row)?.scheduled_end_on
                                  )
                                ).format(DATE_RENDER_FORMAT)
                              : '-'}
                          </span>
                        ),
                        status: (row) => (
                          <StatusBadge
                            status={getStatus(row)?.toLowerCase()}
                            className="PlansTable__table-status"
                          >
                            {capitalize(getStatus(row))}
                          </StatusBadge>
                        )
                      }}
                    />
                    {!trainingPlans.length && <EmptyPlaceholder spacing />}
                  </>
                )}
              </div>
            </>
          )}
          <div>
            <DataPagination
              page={meta.current_page}
              total={meta.total}
              setPage={onPage}
            />
          </div>
          {/*<EmptyPlaceholder*/}
          {/*  spacing*/}
          {/*  icon*/}
          {/*  text="There is no training plan yet... "*/}
          {/*  action={*/}
          {/*    isMobile ? (*/}
          {/*      <Button onClick={() => setAdd(true)}>Create Training Plan</Button>*/}
          {/*    ) : undefined*/}
          {/*  }*/}
          {/*/>*/}
        </Card>
      </Styles>
    )

  return isMobile ? (
    <MobilePage
      title="Current Training Plans"
      headerSpacing={20}
      headerNavChat
      actionComponent={
        clientId === 'all' ? (
          <Tooltip title="Please select a client before creating a plan">
            <Button>Create Plan</Button>
          </Tooltip>
        ) : (
          <Button onClick={() => setAdd(true)}>Create Plan</Button>
        )
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
