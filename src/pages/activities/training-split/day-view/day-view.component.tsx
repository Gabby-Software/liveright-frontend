import { useState } from 'react'

import { CaretLeftIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../../components/cards/card/card.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import { Title } from '../../../../components/typography'
import SplitDayDietCard from '../../components/split-day-card/split-day-diet-card.component'
import SplitDayOtherCard from '../../components/split-day-card/split-day-other-card.component'
import SplitDayTrainingCard from '../../components/split-day-card/split-day-training-card.component'
import { Styles } from './day-view.styles'

interface TrainingSplitDayViewProps {
  onClose: any
}

export default function TrainingSplitDayView({
  onClose
}: TrainingSplitDayViewProps) {
  const [scheduleView, setScheduleView] = useState(false)
  return (
    <Styles>
      <Card className="TrainingSplitDayView__card">
        <GoBack spacing={4} onClick={onClose}>
          Go Back to Training Split Overview
        </GoBack>

        <div className="TrainingSplitDayView__title-container">
          <Title>Current Training Split</Title>

          <Button>Edit Training Split</Button>
        </div>

        <div className="TrainingSplitDayView__divider" />

        <div className="TrainingSplitDayView__badges">
          <div className="TrainingSplitDayView__badge">
            <p className="TrainingSplitDayView__badge-name">Chosen Diet Plan</p>

            <div className="TrainingSplitDayView__badge-badge">
              Diet Plan Balance
            </div>
          </div>
          <div className="TrainingSplitDayView__badge">
            <p className="TrainingSplitDayView__badge-name">
              Chosen Training Plan
            </p>

            <div className="TrainingSplitDayView__badge-badge">
              High Intensity Training
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div>
          <Title className="TrainingSplitDayView__day-title">
            <span>Day 3</span>

            <div className="TrainingSplitDayView__day-arrows">
              <IconButton size="sm">
                <CaretLeftIcon />
              </IconButton>
              <IconButton size="sm">
                <CaretLeftIcon />
              </IconButton>
            </div>
          </Title>
        </div>

        <div className="TrainingSplitDayView__day-subtitle-container">
          <p className="TrainingSplitDayView__day-subtitle">Wednesday</p>

          <div className="TrainingSplitDayView__day-toggle">
            <FormToggleUI
              value={scheduleView}
              onUpdate={() => setScheduleView(!scheduleView)}
            />
            <p className="TrainingSplitDayView__day-toggle-label">
              See with schedule view
            </p>
          </div>
        </div>

        <div className="TrainingSplitDayView__divider" />

        <div className="TrainingSplitDayView__cards">
          <SplitDayTrainingCard
            scheduleTime={scheduleView ? '10:00' : undefined}
          />
          <SplitDayDietCard scheduleTime={scheduleView ? '10:00' : undefined} />
          <SplitDayOtherCard
            scheduleTime={scheduleView ? '10:00' : undefined}
          />
        </div>
      </Card>
    </Styles>
  )
}
