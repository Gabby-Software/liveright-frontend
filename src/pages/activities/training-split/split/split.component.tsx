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
import MakeActiveDialog from '../../components/dialog/make-active-dialog/make-active-dialog.component'
import AddTrainingSplit from '../add-split/add-split.component'
import TrainingSplitDayView from '../day-view/day-view.component'
import { Styles } from './split.styles'

export default function TrainingSplit() {
  const [scheduleView, setScheduleView] = useState(false)
  const [edit, setEdit] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)
  const [day, setDay] = useState<null | number>(null)
  const isMobile = useIsMobile()

  if (edit) {
    return <AddTrainingSplit onClose={() => setEdit(false)} />
  }

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
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div className="TrainingSplits__card-container" key={row}>
              <DayTrainingSplitCard onExpand={() => setDay(row)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="TrainingSplits__cards">
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div className="TrainingSplits__card-container" key={row}>
              <DayTrainingScheduleCard />
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
                  onClick={() => setEdit(true)}
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

              {!isMobile && (
                <Button
                  className="TrainingSplits__filters-make-active-btn"
                  onClick={() => setMakeActiveDialog(true)}
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

      <MakeActiveDialog
        yes="Confirm Chnages"
        cancel="Never mind"
        open={makeActiveDialog}
        onClose={() => setMakeActiveDialog(false)}
        old
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
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Training Split"
      actionComponent={
        <Button onClick={() => setEdit(true)}>Edit Split</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
