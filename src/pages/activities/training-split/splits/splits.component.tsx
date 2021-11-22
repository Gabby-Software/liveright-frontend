import { useState } from 'react'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import DayTrainingScheduleCard from '../../components/day-training-schedule-card/day-training-schedule-card.component'
import DayTrainingSplitCard from '../../components/day-training-split-card/day-training-split-card.component'
import { Styles } from './splits.styles'

export default function TrainingSplits() {
  const [scheduleView, setScheduleView] = useState(false)
  return (
    <Styles>
      <Card>
        <div className="TrainingSplits__title-container">
          <Title>Current Training Split</Title>

          <div className="TrainingSplits__title-buttons">
            <Button
              variant="secondary"
              className="TrainingSplits__title-button"
            >
              See Other Splits
            </Button>
            <Button className="TrainingSplits__title-button">
              Edit Training Split
            </Button>
          </div>
        </div>

        <div className="TrainingSplits__divider" />

        <div className="TrainingSplits__filters-container">
          <Subtitle>Reduce Bodyweight</Subtitle>

          <div>
            <Select
              className="TrainingSplits__filters-control"
              id="TrainingSplits-version"
              options={[]}
              value={{
                label: 'Latest Version',
                value: 'Latest Version'
              }}
            />
          </div>
        </div>

        <Card className="TrainingSplits__info-container">
          <div className="TrainingSplits__info-columns">
            <div className="TrainingSplits__info-column">
              <p className="TrainingSplits__info-title">Chosen Diet Plan</p>
              <p className="TrainingSplits__info-value">Dietplan Balance</p>
            </div>
            <div className="TrainingSplits__info-column">
              <p className="TrainingSplits__info-title">Chosen Training Plan</p>
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

            <StatusBadge status="active">Active</StatusBadge>
          </div>

          <div className="TrainingSplits__info-toggle-container">
            <FormToggleUI
              value={scheduleView}
              onUpdate={() => setScheduleView(!scheduleView)}
              className="TrainingSplits__info-toggle"
            />
            <p>See with schedule view</p>
          </div>
        </Card>

        {!scheduleView ? (
          <div className="TrainingSplits__cards">
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingSplitCard />
            </div>
          </div>
        ) : (
          <div className="TrainingSplits__cards">
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TrainingSplits__card-container">
              <DayTrainingScheduleCard />
            </div>
          </div>
        )}
      </Card>
    </Styles>
  )
}
