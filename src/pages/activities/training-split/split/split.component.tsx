import { useState } from 'react'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import DayTrainingScheduleCard from '../../components/day-training-schedule-card/day-training-schedule-card.component'
import DayTrainingSplitCard from '../../components/day-training-split-card/day-training-split-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import { TS_DEMO } from '../../demo/splits'
import TrainingSplitDayView from '../day-view/day-view.component'
import { Styles } from './split.styles'

export default function TrainingSplit() {
  const [scheduleView, setScheduleView] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [day, setDay] = useState<null | number>(null)
  const isMobile = useIsMobile()
  const data = TS_DEMO

  if (day) {
    return <TrainingSplitDayView onClose={() => setDay(null)} />
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

  const cards = (
    <>
      {!scheduleView ? (
        <div className="TrainingSplits__cards">
          {data.map((row: any, idx: number) => (
            <div className="TrainingSplits__card-container" key={row.day}>
              <DayTrainingSplitCard onExpand={() => setDay(idx)} data={row} />
            </div>
          ))}
        </div>
      ) : (
        <div className="TrainingSplits__cards">
          {data.map((row: any) => (
            <div className="TrainingSplits__card-container" key={row.day}>
              <DayTrainingScheduleCard data={row} />
            </div>
          ))}
        </div>
      )}
    </>
  )

  const content = (
    <>
      <Styles>
        <Card className="TrainingSplits__card">
          {!isMobile && (
            <div className="TrainingSplits__title-container">
              <Title>Current Training Split</Title>

              <div className="TrainingSplits__title-buttons">
                <Button
                  variant="secondary"
                  className="TrainingSplits__title-button"
                >
                  See Other Splits
                </Button>
                <Button
                  className="TrainingSplits__title-button"
                  to={Routes.ACTIVITIES_TS + '/ts_1/edit'}
                >
                  Edit Training Split
                </Button>
              </div>
            </div>
          )}

          {!isMobile && <div className="TrainingSplits__divider" />}

          <div className="TrainingSplits__filters-container">
            <div className="TrainingSplits__filters-title-container">
              <Subtitle>Reduce Bodyweight</Subtitle>

              {isMobile && (
                <Button size="sm" variant="text" to={Routes.ACTIVITIES_TS}>
                  Other Splits
                </Button>
              )}
            </div>

            <div className="TrainingSplits__filters-actions">
              <Select
                className="TrainingSplits__filters-control"
                id="TrainingSplits-version"
                options={[]}
                value={{
                  label: 'Latest Version',
                  value: 'Latest Version'
                }}
              />

              <Button
                className="TrainingSplits__filters-make-active-btn"
                onClick={() => setConfirmDialog(true)}
              >
                Make active
              </Button>
            </div>
          </div>

          <Card className="TrainingSplits__info-container">
            <div className="TrainingSplits__info-columns">
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Chosen Diet Plan</p>
                <p className="TrainingSplits__info-value">Dietplan Balance</p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">
                  Chosen Training Plan
                </p>
                <p className="TrainingSplits__info-value">
                  High Intensity Training
                </p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Number of Days</p>
                <p className="TrainingSplits__info-value">7 days</p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Started on</p>
                <p className="TrainingSplits__info-value">04/10/2021</p>
              </div>
              <div className="TrainingSplits__info-column">
                <p className="TrainingSplits__info-title">Ends on</p>
                <p className="TrainingSplits__info-value">04/11/2021</p>
              </div>

              {isMobile ? (
                <div className="TrainingSplits__info-column">
                  <p className="TrainingSplits__info-title">Status</p>
                  <div className="TrainingSplits__info-badge-container">
                    <StatusBadge status="active">Active</StatusBadge>
                  </div>
                </div>
              ) : (
                <StatusBadge status="active">Active</StatusBadge>
              )}
            </div>

            {!isMobile && scheduleToggle}
          </Card>

          {!isMobile && cards}
        </Card>

        {isMobile && (
          <Card>
            {scheduleToggle}

            {cards}
          </Card>
        )}
      </Styles>

      {/* other condition */}
      <ConfirmDialog
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
              You will have a brand new training split created and made active. it will apply to all future date on you calender.
            </li>
            <li>
              We’ll create a new diet and training plan and make them active. These will have the contents you just added to your training split.
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
      />

      {/* not scheduled  */}
      {/* <ConfirmDialog
        actions={{
          yes: 'Looks good, save it',
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
        titleNote="It has 03"
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
          value: ''
        }}
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
      actionComponent={
        <Button to={`${Routes.ACTIVITIES_TS}/1/edit`}>Edit Split</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
