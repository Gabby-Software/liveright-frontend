import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import { Routes } from '../../../../../enums/routes.enum'
import useTemplateWorkoutDay from '../../../../../hooks/api/templates/workout-days/useTemplateWorkoutDay'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import ActivityLayout from '../../../components/layout/layout.component'
import SplitDayWorkoutCard from '../../../components/split-day-workout-card/split-day-workout-card.component'
import { Styles } from '../../../styles/plan.styles'
import WorkoutDayTemplateForm from '../workout-day-template-form/workout-day-template-form.component'

export default function WorkoutDay() {
  const [edit, setEdit] = useState(false)

  const params = useParams<any>()
  const { workoutDay } = useTemplateWorkoutDay(params.id)

  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}

  if (edit) {
    return (
      <WorkoutDayTemplateForm
        name={`activities`}
        onClose={() => setEdit(false)}
      />
    )
  }

  return (
    <ActivityLayout>
      <Styles>
        <section className="topbar">
          <MobileBack
            to={Routes.ACTIVITIES_TM}
            alias="templates"
            className="topbar-back"
          />

          <Button variant="text" onClick={onDelete} className="topbar-delete">
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <div className="PlanPage__header">
            <Title>{workoutDay?.name}</Title>

            <div className="PlanPage__header-actions">
              <Button
                variant="dark"
                className="PlanPage__header-btn"
                onClick={() => setEdit(true)}
              >
                Edit Workout Day Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Workout Day Template
              </Button>
            </div>
          </div>

          <div className="PlanPage__divider" />

          <div>
            {workoutDay?.activities?.map((a: any, idx: number) => (
              <SplitDayWorkoutCard key={idx} data={a} />
            ))}
          </div>
        </Card>
      </Styles>

      <SplitTemplateDialog
        name="Use Workout Day Template"
        title={workoutDay?.name}
        description="You’re about to use the following workout day template"
        alert={`This will make John Travolta’s active workout day this one (${workoutDay?.name}) starting from 22/11/2021. You can make any changes to the training split after you schedule these changes. Additionally you can revert it at any point by re-activating “High Intensity Training” as the active training plan.`}
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </ActivityLayout>
  )
}
