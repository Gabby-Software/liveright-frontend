import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { getVersionOptions } from '../../../../utils/api/activities'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import Alert from '../../components/alert/alert.component'
import DayTrainingPlanCard from '../../components/day-training-plan-card/day-training-plan-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import EmptyPlan from '../../components/empty-plan/empty-plan.component'
import { Styles } from '../../styles/plan.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'

const IS_EMPTY = false

export default function TrainingPlan() {
  const [edit, setEdit] = useState<boolean | number>(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const history = useHistory()

  useEffect(() => {
    if (!params.clientId) {
      history.push(`${Routes.ACTIVITIES}?return=${Routes.ACTIVITIES_TP}`)
    }
  }, [params.clientId])

  const { revision, trainingPlan } = useTrainingPlan({
    clientId: params.clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const startOn = revision.scheduled_start_on
    ? moment(new Date(revision.scheduled_start_on)).format(DATE_RENDER_FORMAT)
    : '-'

  const versionOptions = useMemo(
    () => getVersionOptions(trainingPlan.revisions || []),
    [trainingPlan]
  )

  if (edit || typeof edit === 'number') {
    return (
      <AddTrainingPlan
        editDay={typeof edit === 'number' ? edit : undefined}
        editId={params.id}
        revisionId={params.revisionId}
        onClose={() => setEdit(false)}
      />
    )
  }

  const content = IS_EMPTY ? (
    <EmptyPlan
      title="Current Training Plan"
      text="There is no training plan yet..."
      Icon={WorkoutIcon}
      action={<Button>Create Training Plan</Button>}
    />
  ) : (
    <>
      <Styles>
        <ActivitiesClient
          viewActivity={false}
          clientId={params.clientId}
          onClientSwitch={(id) => {
            history.push(
              getRoute(Routes.ACTIVITIES_TP, {
                clientId: id
              })
            )
          }}
        />
        <Card className="PlanPage__card">
          {!isMobile && (
            <div className="PlanPage__header">
              <Title>Current Training Plan</Title>

              <div className="PlanPage__header-actions">
                <Button
                  variant="secondary"
                  className="PlanPage__header-btn"
                  to={getRoute(Routes.ACTIVITIES_TP, {
                    clientId: params.clientId
                  })}
                >
                  See Other Plans
                </Button>
                <Button
                  className="PlanPage__header-btn"
                  onClick={() => setEdit(true)}
                >
                  Edit Training Plan
                </Button>
              </div>
            </div>
          )}

          <div className="PlanPage__filters">
            <div className="PlanPage__filters-title-container">
              <Subtitle className="PlanPage__filters-title">
                {revision.name ?? trainingPlan.name}
              </Subtitle>

              {isMobile && (
                <Button
                  variant="text"
                  size="sm"
                  className="PlanPage__filters-archived-btn"
                  to={Routes.ACTIVITIES_TP}
                >
                  Archived Plans
                </Button>
              )}
            </div>

            <div className="PlanPage__filters-actions">
              <Select
                className="PlanPage__filters-select"
                id="training-plan-version"
                options={versionOptions}
                value={versionOptions.find(
                  (o: any) => o.value === revision._id
                )}
                onChange={(e, o) => {
                  history.push(
                    getRoute(Routes.ACTIVITIES_TP_ID, {
                      id: params.id,
                      clientId: params.clientId,
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

          {revision.status === 'scheduled' && (
            <Alert
              content={`This is your revision of your training plan set become active on ${startOn}.`}
            />
          )}

          {!isMobile && <div className="PlanPage__divider" />}

          <div className="PlanPage__badges">
            <div className="PlanPage__badge">
              <p className="PlanPage__badge-title">Status</p>
              <StatusBadge
                status={revision.status}
                className="PlanPage__badge-badge"
              >
                {capitalize(revision.status)}
              </StatusBadge>
            </div>
            {revision.status === 'active' && (
              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">Start and end dates</p>
                <p className="PlanPage__badge-text">
                  The start and end dates of this training plan are tied to the
                  active Training Split
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

          {!isMobile && (
            <div className="PlanPage__cards">
              {revision.days?.map((row: any, index: number) => (
                <DayTrainingPlanCard
                  onExpand={() => setEdit(index)}
                  key={row._id}
                  day={row}
                />
              ))}
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of workout days</p>

            {revision.days?.map((row: any, index: number) => (
              <DayTrainingPlanCard
                onExpand={() => setEdit(index)}
                day={row}
                key={row._id}
              />
            ))}
          </>
        )}

        {isMobile && revision.status === 'inactive' && (
          <Button onClick={() => setConfirmDialog(true)}>Make active</Button>
        )}
      </Styles>

      <ConfirmDialog
        name="Make Active Training Plan"
        description="You're about to make the following training plan the active one"
        title="High Intensity Plan"
        alert={
          <>
            <div className="title">Read this before activating plan!</div>
            <ul>
              <li>
                A new revision of your training plan will be created and it will
                become active. All your workout entires on your calender from
                this day will be updated.
              </li>
              <li>
                This will also make changes to your current training split to
                use the changes you just made.
              </li>
            </ul>
          </>
        }
        date={{ label: 'From when should we apply this change?', value: '' }}
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Plan"
      actionComponent={<Button onClick={() => setEdit(true)}>Edit Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
