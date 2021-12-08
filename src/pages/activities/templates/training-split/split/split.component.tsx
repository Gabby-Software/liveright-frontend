import { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import DayTrainingScheduleCard from '../../../components/day-training-schedule-card/day-training-schedule-card.component'
import DayTrainingSplitCard from '../../../components/day-training-split-card/day-training-split-card.component'
import MakeActiveDialog from '../../../components/dialog/make-active-dialog/make-active-dialog.component'
import ActivityLayout from '../../../components/layout/layout.component'
import { Styles } from './split.styles'

export default function TrainingSplit() {
  const [scheduleView, setScheduleView] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)

  const onDelete = () => {}

  return (
    <ActivityLayout>
      <Styles>
        <section className="TSTemplates__topbar">
          <MobileBack
            to="/"
            alias="current-plan"
            className="TSTemplates__topbar-back"
          />

          <Button
            variant="text"
            onClick={onDelete}
            className="TSTemplates__topbar-delete"
          >
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <section className="TSTemplates__title-container">
          <Title>High Pace Training</Title>

          <div className="TSTemplates__title-buttons">
            <Button variant="dark" className="TSTemplates__title-button">
              Edit Split Template
            </Button>
            <Button
              className="TSTemplates__title-button"
              onClick={() => setMakeActiveDialog(true)}
            >
              Use Split Template
            </Button>
          </div>
        </section>

        <div className="TSTemplates__divider" />

        <section className="TSTemplates__info-container">
          <div className="TSTemplates__info-column">
            <p className="TSTemplates__info-title">Number of Days</p>
            <p className="TSTemplates__info-value">7 days</p>
          </div>
        </section>

        <section className="TSTemplates__info-toggle-container">
          <FormToggleUI
            value={scheduleView}
            onUpdate={() => setScheduleView(!scheduleView)}
            className="TrainingSplits__info-toggle"
          />
          <p>See with schedule view</p>
        </section>

        {!scheduleView ? (
          <div className="TSTemplates__cards">
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingSplitCard />
            </div>
          </div>
        ) : (
          <div className="TSTemplates__cards">
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
            <div className="TSTemplates__card-container">
              <DayTrainingScheduleCard />
            </div>
          </div>
        )}
      </Styles>

      <MakeActiveDialog
        open={makeActiveDialog}
        onClose={() => setMakeActiveDialog(false)}
      />
    </ActivityLayout>
  )
}
