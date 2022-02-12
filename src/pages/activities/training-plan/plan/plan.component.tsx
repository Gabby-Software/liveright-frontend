import moment, { Moment } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { toast } from '../../../../components/toast/toast.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useClientAccount from '../../../../hooks/api/accounts/useClientAccount'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { getVersionOptions } from '../../../../utils/api/activities'
import { DATE_PRETTY_FORMAT, DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import Alert from '../../components/alert/alert.component'
import DayTrainingPlanCard from '../../components/day-training-plan-card/day-training-plan-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import EmptyPlan from '../../components/empty-plan/empty-plan.component'
import { Styles } from '../../styles/plan.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'
import TrainingPlanDayView from '../day-view/training-plan-day-view.component'

const IS_EMPTY = false

export default function TrainingPlan() {
  const [edit, setEdit] = useState<boolean | number>(false)
  const [activationDate, setActivationDate] = useState<string>(
    new Date().toISOString()
  )
  const [expandedActivityIndex, setExpandedActivityIndex] = useState<
    boolean | number
  >(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const history = useHistory()
  const queryParams = new URLSearchParams(location.search)
  const { type: userType } = useAuth()
  const { user: client } = useClientAccount(params.clientId)

  useEffect(() => {
    if (queryParams.get('edit')) {
      setEdit(true)
    }
  }, [])

  useEffect(() => {
    if (!params.clientId) {
      history.push(`${Routes.ACTIVITIES}?return=${Routes.ACTIVITIES_TP}`)
    }
  }, [params.clientId])

  const { revision, trainingPlan, onEdit } = useTrainingPlan({
    clientId: params.clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const onMakeActive = () => {
    onEdit(
      params.id,
      params.revisionId,
      {
        ...revision,
        scheduled_start_on: activationDate,
        scheduled_end_on: moment(activationDate).isBefore(
          revision.scheduled_end_on
        )
          ? revision.schedule_end_on
          : null
      },
      () => {
        toast.show({
          type: 'success',
          msg: `Training Plan successfully ${
            activationDate === new Date().toDateString()
              ? 'made active'
              : 'scheduled'
          }.`
        })
        setConfirmDialog(false)
      }
    )
  }

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
        editWorkout={typeof edit === 'number' ? edit : undefined}
        editId={params.id}
        revisionId={params.revisionId}
        onClose={() => setEdit(false)}
      />
    )
  }

  if (expandedActivityIndex || typeof expandedActivityIndex === 'number') {
    return (
      <TrainingPlanDayView
        onClose={() => setExpandedActivityIndex(false)}
        index={expandedActivityIndex as number}
        setIndex={setExpandedActivityIndex}
        onEdit={() => {
          setEdit(expandedActivityIndex)
          setExpandedActivityIndex(false)
        }}
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
        {userType !== userTypes.CLIENT && (
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
        )}

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
                  to={getRoute(Routes.ACTIVITIES_TP, {
                    clientId: params.clientId
                  })}
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

          <div
            className="PlanPage__badges"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="PlanPage__badges-content">
              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">Status</p>
                <StatusBadge
                  status={revision.status}
                  className="PlanPage__badge-badge"
                >
                  {capitalize(revision.status)}
                </StatusBadge>
              </div>

              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">Start date</p>
                <p className="PlanPage__badge-text">
                  {revision.scheduled_start_on
                    ? moment(revision.scheduled_start_on).format(
                        DATE_RENDER_FORMAT
                      )
                    : '-'}
                </p>
              </div>

              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">End date</p>
                <p className="PlanPage__badge-text">
                  {revision.scheduled_end_on
                    ? moment(revision.scheduled_end_on).format(
                        DATE_RENDER_FORMAT
                      )
                    : '-'}
                </p>
              </div>
            </div>
          </div>
          {revision.status === 'active' && revision.training_split?._id && (
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
          <br />
          {!isMobile && (
            <div className="PlanPage__cards">
              {/* {revision.days &&
                revision.days[0]?.activities?.map((row: any, index: number) => (
                  <DayTrainingPlanCard
                    onExpand={() => setExpandedActivityIndex(index)}
                    key={row._id}
                    activity={row}
                  />
                ))} */}
              {revision.activities &&
                revision.activities?.map((row: any, index: number) => (
                  <DayTrainingPlanCard
                    onExpand={() => setExpandedActivityIndex(index)}
                    key={row._id}
                    activity={row}
                  />
                ))}
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of workouts</p>

            {/* {revision.days &&
              revision.days[0]?.activities?.map((row: any, index: number) => (
                <DayTrainingPlanCard
                  onExpand={() => setExpandedActivityIndex(index)}
                  key={row._id}
                  activity={row}
                />
              ))} */}
            {revision.activities &&
              revision.activities?.map((row: any, index: number) => (
                <DayTrainingPlanCard
                  onExpand={() => setExpandedActivityIndex(index)}
                  key={row._id}
                  activity={row}
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
        title={trainingPlan.name}
        alert={`This will make “${trainingPlan.name}” ${client.full_name}’s ${
          moment(activationDate).isAfter() ? 'scheduled' : 'active'
        } training plan starting from ${moment(activationDate).format(
          DATE_PRETTY_FORMAT
        )}. This means the training split will also be changed to reference this training plan.
         You can revert it at any point by re-activating previous training plan as the active training plan.`}
        date={{
          label:
            'From when should we apply this change? Selecting a future date will schdule the training plan.',
          value: activationDate,
          disabledDate: (date: Moment) => date.isBefore(),
          onChange: (date: any) =>
            setActivationDate(new Date(date).toISOString())
        }}
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        actions={{
          yes: 'Confirm Changes',
          cancel: 'Nevermind',
          onYes: onMakeActive,
          onCancel: () => {
            setConfirmDialog(false)
            setActivationDate(new Date().toISOString())
          },
          layout: 'left'
        }}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Plan"
      headerSpacing={20}
      headerNavChat
      actionComponent={<Button onClick={() => setEdit(true)}>Edit Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
