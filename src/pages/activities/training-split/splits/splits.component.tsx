import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import DataTable from '../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Select from '../../../../components/form/select/select.component'
import { EmptyPlaceholder } from '../../../../components/placeholders'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import Tooltip from '../../../../components/tooltip/tooltip.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useTrainingSplits from '../../../../hooks/api/activities/useTrainingSplits'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getActiveOrLatestRev } from '../../../../utils/api/activities'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
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

export default function TrainingSplits() {
  const isMobile = useIsMobile()
  const { clientId } = useParams<{ clientId: any }>()
  const history = useHistory()
  const { type: userType } = useAuth()
  const [status, setStatus] = useState('')
  const [sorting, setSorting] = useState<any>({
    sortKey: '',
    sortMethod: 0
  })
  const { trainingSplits, isLoading } = useTrainingSplits({
    clientId: clientId,
    status
  })

  const sortLogic = (a: any, b: any) => {
    let sortValue = 0
    switch (sorting?.sortKey) {
      case 'name':
        sortValue =
          a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase()) *
          sorting?.sortMethod
        break
      case 'diet_plan':
        sortValue =
          a?.diet_plan?.name
            ?.toLowerCase()
            .localeCompare(b?.diet_plan?.name?.toLowerCase()) *
          sorting?.sortMethod
        break
      case 'training_plan':
        sortValue =
          a?.training_plan?.name
            ?.toLowerCase()
            .localeCompare(b?.training_plan?.name?.toLowerCase()) *
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

  const content = (
    <Styles>
      {userType !== userTypes.CLIENT && (
        <ActivitiesClient
          viewActivity={false}
          clientId={clientId}
          onClientSwitch={(id) => {
            history.push(getRoute(Routes.ACTIVITIES_TS, { clientId: id }))
          }}
        />
      )}
      <Card className="PlansTable__card">
        {!isMobile && (
          <>
            <div className="PlansTable__title-container">
              <Title>Training Splits</Title>

              <div>
                {clientId !== 'all' && (
                  <Button
                    to={getRoute(Routes.ACTIVITIES_TS_NEW, {
                      clientId: clientId
                    })}
                  >
                    Create New Split
                  </Button>
                )}
                {clientId === 'all' && (
                  <Tooltip title="Please select a client before creating a split">
                    <Button>Create New Split</Button>
                  </Tooltip>
                )}
              </div>
            </div>
          </>
        )}

        <div className="PlansTable__filters">
          {userType !== userTypes.CLIENT && (
            <ClientSelect
              id="DietPlans-client"
              value={clientId}
              onChange={(e) =>
                history.push(getRoute(Routes.ACTIVITIES_TS, { clientId: e }))
              }
              placeholder="All Client"
              className="PlansTable__select"
            />
          )}
          <Select
            id="DietPlans-statuses"
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
              {trainingSplits.map((row, index) => (
                <PlanCard
                  plan={row}
                  key={index}
                  to={getRoute(Routes.ACTIVITIES_TS_ID, {
                    clientId: row.account_id || clientId,
                    id: row._id,
                    revisionId: getActiveOrLatestRev(row)._id
                  })}
                />
              ))}
            </>
          ) : (
            <DataTable
              labels={LABELS}
              data={trainingSplits.sort(sortLogic)}
              keys={KEYS}
              sort={sorting}
              setSort={setSorting}
              loading={isLoading}
              round="10px"
              render={{
                name: (row) => (
                  <Link
                    to={getRoute(Routes.ACTIVITIES_TS_ID, {
                      clientId: row.account_id || clientId,
                      id: row._id,
                      revisionId: getActiveOrLatestRev(row)._id
                    })}
                    className="PlansTable__table-link"
                  >
                    <span>{row.name}</span>
                  </Link>
                ),
                diet_plan: (row) => row.diet_plan?.name || '',
                training_plan: (row) => row.training_plan?.name || '',
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
                days: (row) => getActiveOrLatestRev(row)?.days_count
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
      headerSpacing={20}
      headerNavChat
      actionComponent={
        clientId === 'all' ? (
          <Tooltip title="Please select a client before creating a plan">
            <Button>Create Split</Button>
          </Tooltip>
        ) : (
          <Button
            to={getRoute(Routes.ACTIVITIES_TS_NEW, { clientId: clientId })}
          >
            Create Split
          </Button>
        )
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
