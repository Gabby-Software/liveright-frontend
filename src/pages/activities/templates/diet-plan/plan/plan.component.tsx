import { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import { WorkoutIcon } from '../../../../../assets/media/icons/activities'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import DayTrainingPlanCard from '../../../components/day-training-plan-card/day-training-plan-card.component'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import ActivityLayout from '../../../components/layout/layout.component'
import { Styles } from '../../../styles/plan.styles'

export default function DietPlan() {
  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}

  return (
    <ActivityLayout>
      <Styles>
        <section className="topbar">
          <MobileBack to="/" alias="current-plan" className="topbar-back" />

          <Button variant="text" onClick={onDelete} className="topbar-delete">
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <div className="PlanPage__header">
            <Title>Training Plan From Nov 1</Title>

            <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
                Edit Training Plan Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Training Plan Template
              </Button>
            </div>
          </div>

          <div className="PlanPage__divider" />

          <div className="PlanPage__cards">
            <DayTrainingPlanCard />
            <DayTrainingPlanCard />
            <DayTrainingPlanCard />
          </div>
        </Card>
      </Styles>

      <SplitTemplateDialog
        name="Use training plan template"
        title="Training Plan From Nov 1"
        description="You’re about to use the following training plan template"
        alert="This will make John Travolta’s active training plan this one (Training Plan From Nov 1) starting from 22/11/2021. You can make any changes to the training split after you schedule these changes. Additionally you can revert it at any point by re-activating “High Intensity Training” as the active training plan."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </ActivityLayout>
  )
}
