import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../../enums/routes.enum'
import useTemplateTrainingSplit from '../../../../../hooks/api/templates/training-splits/useTemplateTrainingSplit'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import DayTrainingScheduleCard from '../../../components/day-training-schedule-card/day-training-schedule-card.component'
import DayTrainingSplitCard from '../../../components/day-training-split-card/day-training-split-card.component'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import TemplateLayout from '../../../components/layout/layout.component'
import TemplateMobilePage from '../../components/template-mobile-page/template-mobile-page.component'
import TrainingSplitDayView from '../day-view/day-view.component'
import EditTemplateTrainingSplit from '../edit/edit.component'
import { Styles } from './split.styles'

export default function TrainingSplit() {
  const isMobile = useIsMobile()
  const [day, setDay] = useState<null | number>(null)
  const [scheduleView, setScheduleView] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [edit, setEdit] = useState(false)
  const params = useParams<any>()

  const { trainingSplit } = useTemplateTrainingSplit({ id: params.id })
  const onDelete = () => {}

  if (edit) {
    return <EditTemplateTrainingSplit onClose={() => setEdit(false)} />
  }

  if (day) {
    return (
      <TrainingSplitDayView
        index={day - 1}
        onClose={() => setDay(null)}
        setIndex={setDay}
        revision={trainingSplit}
      />
    )
  }

  const mainContent = (
    <Styles>
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

      <div className="TSTemplates__cards">
        {trainingSplit?.days?.map((row: any) =>
          scheduleView ? (
            <div className="TSTemplates__card-container" key={row.day}>
              <DayTrainingScheduleCard data={row} subtitle="Wen" />
            </div>
          ) : (
            <div className="TSTemplates__card-container" key={row.day}>
              <DayTrainingSplitCard data={row} subtitle="Wen" />
            </div>
          )
        )}
      </div>
    </Styles>
  )

  return isMobile ? (
    <>
      <TemplateMobilePage
        pageTitle="Detail Training Split"
        contentTitle={trainingSplit.name}
        actionComponent={
          <Button
            className="TSTemplates__title-button"
            onClick={() => setShowDialog(true)}
          >
            Use Split
          </Button>
        }
        onEdit={() => {
          setEdit(true)
        }}
        onDelete={onDelete}
      >
        {mainContent}
      </TemplateMobilePage>

      <SplitTemplateDialog
        name="Use split template"
        title="High Pace Training"
        description="You’re about to use the following training split template"
        alert="This will make John Travolta’s active training split this one (High Pace Training) starting from 22/11/2021. You can make any changes to the training split after you schedule these changes. Additionally you can revert it at any point by re-activating Reduce Bodyweight as the active plan."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  ) : (
    <>
      <TemplateLayout>
        <Styles>
          <section className="TSTemplates__topbar">
            <MobileBack
              to={Routes.ACTIVITIES_TM}
              alias="templates"
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
            <h1 className="TSTemplates__title">{trainingSplit.name}</h1>

            <div className="TSTemplates__title-buttons">
              <Button
                variant="dark"
                className="TSTemplates__title-button"
                onClick={() => setEdit(true)}
              >
                Edit Split Template
              </Button>
              <Button
                className="TSTemplates__title-button"
                onClick={() => setShowDialog(true)}
              >
                Use Split Template
              </Button>
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

          <div className="TSTemplates__cards">
            {trainingSplit?.days?.map((row: any, idx: number) =>
              scheduleView ? (
                <div className="TSTemplates__card-container" key={row.day}>
                  <DayTrainingScheduleCard
                    data={row}
                    subtitle="Wen"
                    onExpand={() => setDay(idx + 1)}
                  />
                </div>
              ) : (
                <div className="TSTemplates__card-container" key={row.day}>
                  <DayTrainingSplitCard
                    data={row}
                    subtitle="web"
                    onExpand={() => setDay(idx + 1)}
                  />
                </div>
              )
            )}
          </div>
        </Styles>
      </TemplateLayout>

      <SplitTemplateDialog
        name="Use split template"
        title="High Pace Training"
        description="You’re about to use the following training split template"
        alert="This will make John Travolta’s active training split this one (High Pace Training) starting from 22/11/2021. You can make any changes to the training split after you schedule these changes. Additionally you can revert it at any point by re-activating Reduce Bodyweight as the active plan."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}
