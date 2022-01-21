import { capitalize } from 'lodash'
import moment, { Moment } from 'moment'
import { useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { toast } from '../../../../components/toast/toast.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useTrainingSplit from '../../../../hooks/api/activities/useTrainingSplit'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getVersionOptions } from '../../../../utils/api/activities'
import { DATE_PRETTY_FORMAT, DATE_RENDER_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import DayTrainingScheduleCard from '../../components/day-training-schedule-card/day-training-schedule-card.component'
import DayTrainingSplitCard from '../../components/day-training-split-card/day-training-split-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import TrainingSplitDayView from '../day-view/day-view.component'
import { Styles } from './split.styles'

export default function TrainingSplit() {
  const [scheduleView, setScheduleView] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [activationDate, setActivationDate] = useState<string>(
    new Date().toISOString()
  )
  const [day, setDay] = useState<null | number>(null)
  const isMobile = useIsMobile()
  const { type: userType } = useAuth()

  const history = useHistory()
  const params = useParams<any>()

  const { trainingSplit, revision, onEdit } = useTrainingSplit({
    clientId: params.clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const versionOptions = useMemo(
    () => getVersionOptions(trainingSplit.revisions || []),
    [trainingSplit]
  )

  if (day) {
    return (
      <TrainingSplitDayView
        index={day - 1}
        onClose={() => setDay(null)}
        setIndex={setDay}
      />
    )
  }

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
          msg: `Training Split successfully ${
            activationDate === new Date().toISOString()
              ? 'made active'
              : 'scheduled'
          }.`
        })
        setConfirmDialog(false)
      }
    )
  }

  const scheduleToggle = (
    <div className="TrainingSplits__info-toggle-container">
      <FormToggleUI
        value={scheduleView}
        onUpdate={() => setScheduleView(!scheduleView)}
        className="TrainingSplits__info-toggle"
      />
      <p>See with schedule view</p>
    </div>
  )
  const startDate = new Date(revision.scheduled_start_on)
  startDate.setDate(startDate.getDate() - 1)

  const cards = (
    <>
      {!scheduleView ? (
        <div className="TrainingSplits__cards">
          {revision?.days?.map((row: any, idx: number) => (
            <div className="TrainingSplits__card-container" key={row.day}>
              <DayTrainingSplitCard
                day={`Day ${idx + 1}`}
                onExpand={() => setDay(idx + 1)}
                data={row}
                subtitle={moment(
                  startDate.setDate(startDate.getDate() + 1)
                ).format('dddd')}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="TrainingSplits__cards">
          {revision?.days?.map((row: any, idx: number) => (
            <div className="TrainingSplits__card-container" key={row.day}>
              <DayTrainingScheduleCard
                onExpand={() => setDay(idx + 1)}
                day={`Day ${idx + 1}`}
                data={row}
                subtitle={moment(
                  startDate.setDate(startDate.getDate() + 1)
                ).format('dddd')}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )

  const content = (
    <>
      <Styles>
        {userType !== userTypes.CLIENT && (
          <ActivitiesClient
            viewActivity={false}
            clientId={params.clientId}
            onClientSwitch={(id) => {
              history.push(
                getRoute(Routes.ACTIVITIES_TS_ID, {
                  clientId: id,
                  id: params.id,
                  revisionId: params.revisionId
                })
              )
            }}
          />
        )}

        <Card className="TrainingSplits__card">
          {!isMobile && (
            <div className="TrainingSplits__title-container">
              <Title>Current Training Split</Title>

              <div className="TrainingSplits__title-buttons">
                <Button
                  variant="secondary"
                  className="TrainingSplits__title-button__mr"
                  to={getRoute(Routes.ACTIVITIES_TS, {
                    clientId: params.clientId
                  })}
                >
                  See Other Splits
                </Button>
                <Button
                  className="TrainingSplits__title-button"
                  to={getRoute(Routes.ACTIVITIES_TS_EDIT, {
                    clientId: params.clientId,
                    id: params.id,
                    revisionId: params.revisionId
                  })}
                >
                  Edit Training Split
                </Button>
              </div>
            </div>
          )}

          {!isMobile && <div className="TrainingSplits__divider" />}

          <div className="TrainingSplits__filters-container">
            <div className="TrainingSplits__filters-title-container">
              <Subtitle>{trainingSplit.name}</Subtitle>

              {isMobile && (
                <Button
                  size="sm"
                  variant="text"
                  to={getRoute(Routes.ACTIVITIES_TS, {
                    clientId: params.clientId
                  })}
                >
                  Other Splits
                </Button>
              )}
            </div>

            <div className="TrainingSplits__filters-actions">
              <Select
                className="TrainingSplits__filters-control"
                id="TrainingSplits-version"
                options={versionOptions}
                value={versionOptions.find(
                  (o: any) => o.value === revision._id
                )}
                onChange={(e, o) => {
                  history.push(
                    getRoute(Routes.ACTIVITIES_TS_ID, {
                      id: params.id,
                      clientId: params.clientId,
                      revisionId: o.value
                    })
                  )
                }}
              />

              {revision.status !== 'active' && (
                <Button
                  className="TrainingSplits__filters-make-active-btn"
                  onClick={() => setConfirmDialog(true)}
                >
                  Make active
                </Button>
              )}
            </div>
          </div>

          <Card className="TrainingSplits__info-container">
            <div className="TrainingSplits__info-columns">
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Chosen Diet Plan</p>
                <p className="TrainingSplits__info-value">
                  {revision.diet_plan?.name}
                </p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">
                  Chosen Training Plan
                </p>
                <p className="TrainingSplits__info-value">
                  {revision.training_plan?.name}
                </p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Number of Days</p>
                <p className="TrainingSplits__info-value">
                  {revision.days_count}
                </p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Started on</p>
                <p className="TrainingSplits__info-value">
                  {revision.scheduled_start_on
                    ? moment(revision.scheduled_start_on).format(
                        DATE_RENDER_FORMAT
                      )
                    : '-'}
                </p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Ends on</p>
                <p className="TrainingSplits__info-value">
                  {revision.scheduled_end_on
                    ? moment(revision.scheduled_end_on).format(
                        DATE_RENDER_FORMAT
                      )
                    : '-'}
                </p>
              </div>

              {isMobile ? (
                <div className="TrainingSplits__info-column">
                  <p className="TrainingSplits__info-title">Status</p>
                  <div className="TrainingSplits__info-badge-container">
                    <StatusBadge status={revision.status}>
                      {capitalize(revision.status)}
                    </StatusBadge>
                  </div>
                </div>
              ) : (
                <StatusBadge status={revision.status}>
                  {capitalize(revision.status)}
                </StatusBadge>
              )}
            </div>

            {!isMobile && scheduleToggle}
          </Card>

          {!isMobile && cards}
        </Card>

        {isMobile && (
          <>
            <h3 className="TrainingSplits__listOfDays">List of Days</h3>
            <Card>
              {scheduleToggle}

              {cards}
            </Card>
          </>
        )}
      </Styles>

      {/* active condition */}
      <ConfirmDialog
        actions={{
          yes: 'Looks good, activate it',
          cancel: 'Cancel',
          onYes: () => onMakeActive(),
          onCancel: () => setConfirmDialog(false),
          layout: 'between'
        }}
        open={revision.status === 'scheduled' && confirmDialog}
        onClose={() => setConfirmDialog(false)}
        name="Activate Training Split"
        description="You’re about to create a new training split"
        title={trainingSplit.name}
        titleNote={`It has ${
          revision.days_count
        } days and is scheduled to become active on ${moment(
          revision.scheduled_start_on
        ).format(DATE_PRETTY_FORMAT)}.`}
        alertTitle="Read this slowly and carefully!"
        alert={
          <ul>
            <li>
              Your current Training Split <b>“{trainingSplit.name}”</b> will be
              replaced with this new one. You can always go back to the Training
              SPlit list and re-activate <b>“{trainingSplit.name}”</b>.
            </li>
            <li>
              Your current active Diet Plan will be replaced with the one you
              created or edited as part of this training split.
            </li>
            <li>
              Your cuurent Traning Plan will be replaced with the one you
              created or edited as part of this training split.
            </li>
          </ul>
        }
        plans={{
          trainings: revision.days?.map((d: any) => ({
            id: d.training_plan_day._id,
            title: d.training_plan_day.name
          })),
          meals: revision.days?.map((d: any) => ({
            id: d.diet_plan_day._id,
            title: d.diet_plan_day.name
          }))
        }}
      />

      {/* not scheduled  */}
      <ConfirmDialog
        actions={{
          yes: 'Looks good, save it',
          cancel: 'Cancel',
          onYes: onMakeActive,
          onCancel: () => {
            setConfirmDialog(false)
            setActivationDate('')
          },
          layout: 'between'
        }}
        open={revision.status === 'inactive' && confirmDialog}
        onClose={() => setConfirmDialog(false)}
        name="Create Training Split"
        description="You’re about to create a new training split"
        title={trainingSplit.name}
        titleNote={`It has ${revision.days_count} days`}
        date={{
          label: (
            <span>
              Right now it is&nbsp;
              <span style={{ color: 'red' }}>Not Scheduled!</span>
              <br />
              You can find it under &quot;Training Splits&quot; and make it
              &nbsp;active at any point or schedule it to become active
              &nbsp;later late.
            </span>
          ),
          value: activationDate,
          disabledDate: (date: Moment) => date.isBefore(),
          onChange: (date: any) =>
            setActivationDate(new Date(date).toISOString())
        }}
        plans={{
          trainings: revision.days?.map((d: any) => ({
            id: d.training_plan_day._id,
            title: d.training_plan_day.name
          })),
          meals: revision.days?.map((d: any) => ({
            id: d.diet_plan_day._id,
            title: d.diet_plan_day.name
          }))
        }}
      />

      {/* make it active */}
      {/* <ConfirmDialog
        actions={{
          yes: 'Looks good, schedule it',
          cancel: 'Cancel',
          onYes: () => setConfirmDialog(false),
          onCancel: () => setConfirmDialog(false),
          layout: 'between'
        }}
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        name="Create Training Split"
        description="You’re about to create a new training split"
        title="Training Split Created on Nov 01"
        titleNote="It has 03 days and is scheduled to become active on 10th November 2021."
        alertTitle='Read this slowly and carefully!'
        alert={
          <ul>
            <li>
              Your current Training Split <b>“My Split”</b> will be replaced with
              this new one. You can always go back to the Training SPlit list
              and re-activate <b>“My Split”</b>.
            </li>
            <li>
              Your current active Diet Plan will be replaced with the one you
              created or edited as part of this training split.
            </li>
            <li>
              Your cuurent Traning Plan will be replaced with the one you
              created or edited as part of this training split.
            </li>
          </ul>
        }
        plans={{
          trainings: [
            { id: '00', title: 'High Intensity Training' },
            { id: '01', title: 'Low Intensity Training' }
          ],
          meals: [
            { id: '00', title: 'High Carbs Day' },
            { id: '01', title: 'Low Carbs Day' }
          ]
        }}
      /> */}

      {/* other condition */}
      {/* <ConfirmDialog
        actions={{
          yes: 'Looks good, schedule it',
          cancel: 'Cancel',
          onYes: () => setConfirmDialog(false),
          onCancel: () => setConfirmDialog(false),
          layout: 'between'
        }}
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        name="Create Training Split"
        description="You’re about to making changes to the following training split:"
        title="Training Split Created on Nov 01"
        date={{
          label:
            'Please select the date from when you want these changes to be applied:',
          value: ''
        }}
        alertTitle='Read this before make change!'
        alert={
          <ul>
            <li>
              A new revision of your training plan will be created. You can,
              at all times, go back to old revisions, such as the one you just
              edited, and re-activate it.
            </li>
            <li>
              Any changes you made to training and diet plans will be applied
              to respective meal/training plans. A new revision will be
              created.
            </li>
            <li>
              The version you just edited will become active and applied to
              any future dates on your calendar.
            </li>
          </ul>
        }
        plans={{
          trainings: [
            { id: '00', title: 'High Intensity Training' },
            { id: '01', title: 'Low Intensity Training' }
          ],
          meals: [
            { id: '00', title: 'High Carbs Day' },
            { id: '01', title: 'Low Carbs Day' }
          ]
        }}
      /> */}
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Split"
      headerSpacing={20}
      actionComponent={
        <Button
          to={getRoute(Routes.ACTIVITIES_TS_EDIT, {
            clientId: params.clientId,
            id: params.id,
            revisionId: params.revisionId
          })}
        >
          Edit Split
        </Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
