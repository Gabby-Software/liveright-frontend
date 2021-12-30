import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../components/form/label/label.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useDietPlan from '../../../../hooks/api/activities/useDietPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { getVersionOptions } from '../../../../utils/api/activities'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import Alert from '../../components/alert/alert.component'
import DayDietPlanCard from '../../components/day-diet-plan-card/day-diet-plan-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import { Styles } from '../../styles/plan.styles'
import AddDietPlan from '../add-plan/add-plan.component'

export default function DietPlan() {
  const [edit, setEdit] = useState<boolean | number>(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const history = useHistory()

  useEffect(() => {
    if (!params.clientId) {
      history.push(`${Routes.ACTIVITIES}?return=${Routes.ACTIVITIES_DP}`)
    }
  }, [params.clientId])

  const { revision, dietPlan } = useDietPlan({
    clientId: params.clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const startOn = revision.scheduled_start_on
    ? moment(new Date(revision.scheduled_start_on)).format(DATE_RENDER_FORMAT)
    : '-'

  const versionOptions = useMemo(
    () => getVersionOptions(dietPlan.revisions || []),
    [dietPlan]
  )

  if (edit || typeof edit === 'number') {
    return (
      <AddDietPlan
        editDay={typeof edit === 'number' ? edit : undefined}
        editId={params.id}
        revisionId={params.revisionId}
        onClose={() => setEdit(false)}
      />
    )
  }

  const content = (
    <>
      <Styles>
        <ActivitiesClient
          clientId={params.clientId}
          viewActivity={false}
          onClientSwitch={(id) => {
            history.push(
              getRoute(Routes.ACTIVITIES_DP, {
                clientId: id
              })
            )
          }}
        />
        <Card className="PlanPage__card">
          {!isMobile && (
            <div className="PlanPage__header">
              <Title>Current Diet Plan</Title>

              <div className="PlanPage__header-actions">
                <Button
                  variant="dark"
                  className="PlanPage__header-btn"
                  to={getRoute(Routes.ACTIVITIES_DP, {
                    clientId: params.clientId
                  })}
                >
                  See Other Plans
                </Button>
                <Button
                  className="PlanPage__header-btn"
                  onClick={() => setEdit(true)}
                >
                  Edit Diet Plan
                </Button>
              </div>
            </div>
          )}

          {revision.status === 'scheduled' && (
            <Alert
              content={`This Diet plan is set become active on ${startOn}.`}
            />
          )}

          <Card className="PlanPage__info">
            <div className="PlanPage__filters">
              <div className="PlanPage__filters-title-container">
                <Subtitle className="PlanPage__filters-title">
                  {revision.name ?? dietPlan.name}
                </Subtitle>

                {isMobile && (
                  <Button
                    variant="text"
                    size="sm"
                    className="PlanPage__filters-archived-btn"
                    to={Routes.ACTIVITIES_DP}
                  >
                    Archived Plans
                  </Button>
                )}
              </div>

              <div className="PlanPage__filters-actions">
                <Select
                  className="PlanPage__filters-select"
                  id="DietPlan-version"
                  options={versionOptions}
                  value={versionOptions.find(
                    (o: any) => o.value === revision._id
                  )}
                  onChange={(e, o) => {
                    history.push(
                      getRoute(Routes.ACTIVITIES_DP_ID, {
                        clientId: params.clientId,
                        id: params.id,
                        revisionId: o.value
                      })
                    )
                  }}
                />

                {!isMobile && revision.status === 'inactive' && (
                  <Button
                    className="PlanPage__filters-make-active-btn"
                    onClick={() => setConfirmDialog(true)}
                  >
                    Make active
                  </Button>
                )}
              </div>
            </div>

            <div className="PlanPage__divider" />

            <div className="PlanPage__statuses">
              <div className="PlanPage__statuses-content">
                <div className="PlanPage__badge">
                  <StatusBadge
                    status={revision.status}
                    className="PlanPage__info-badge"
                  >
                    {capitalize(revision.status)}
                  </StatusBadge>
                </div>

                {revision.status === 'active' && (
                  <div className="PlanPage__badge">
                    <p className="PlanPage__badge-title">Start and end dates</p>
                    <p className="PlanPage__badge-text">
                      The start and end dates of this training plan are tied to
                      the active Training Split
                    </p>
                  </div>
                )}
                {revision.status === 'scheduled' && (
                  <div className="PlanPage__badge">
                    <p className="PlanPage__badge-title">Starting on</p>
                    <p className="PlanPage__badge-text">
                      {revision.scheduled_start_on
                        ? moment(new Date(revision.scheduled_start_on)).format(
                            DATE_RENDER_FORMAT
                          )
                        : '-'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox style={{ marginRight: '0.5rem' }} />
                  <Label
                    className="MealAccordion__checkbox"
                    style={{ margin: 0 }}
                  >
                    Save as re-usable template
                  </Label>
                </div>
              </div>
            </div>
          </Card>

          {!isMobile && (
            <div className="PlanPage__cards">
              {revision.days?.map((row: any, index: number) => (
                <DayDietPlanCard
                  key={row._id}
                  onExpand={() => setEdit(index)}
                  day={row}
                />
              ))}
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of meal days</p>

            {revision.days?.map((row: any, index: number) => (
              <DayDietPlanCard
                onExpand={() => setEdit(index)}
                day={row}
                key={row._id}
              />
            ))}
          </>
        )}

        {isMobile && (
          <Button onClick={() => setConfirmDialog(true)}>Make active</Button>
        )}
      </Styles>

      <ConfirmDialog
        name="Make Active Diet Plan"
        description="You're about to make the following diet plan the active one"
        title="Diet 2"
        alert="This will make John Travolta’s active diet plan this one “Diet 2” starting from 22/11/2021. This means the training split will also be changed to reference this diet plan. You can revert it at any point by re-activating “Balanced Diet” as the active diet plan."
        date={{ label: 'From when should we apply this change?', value: '' }}
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        actions={{
          yes: 'Confirm Changes',
          cancel: 'Nevermind',
          onYes: () => setConfirmDialog(false),
          onCancel: () => setConfirmDialog(false),
          layout: 'left'
        }}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Diet Plan"
      actionComponent={<Button onClick={() => setEdit(true)}>Edit Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
