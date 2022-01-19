import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import { Routes } from '../../../../../enums/routes.enum'
import useTemplateDietPlan from '../../../../../hooks/api/templates/diet-plan/useTemplateDietPlan'
import DayDietPlanCard from '../../../components/day-diet-plan-card/day-diet-plan-card.component'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import ActivityLayout from '../../../components/layout/layout.component'
import { Styles } from '../../../styles/plan.styles'

export default function DietPlan() {
  const [showConfirm, setShowConfirm] = useState(false)
  const { id } = useParams<any>()
  const { dietTemplate } = useTemplateDietPlan(id)
  console.log(dietTemplate)
  const onDelete = () => {}

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
            <Title>Current Diet Plan</Title>

            <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
                Edit Diet Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Diet Template
              </Button>
            </div>
          </div>

          <div className="PlanPage__divider" />

          <div className="PlanPage__cards">
            <DayDietPlanCard day={dietTemplate} onExpand={() => {}} />
          </div>
        </Card>
      </Styles>

      <SplitTemplateDialog
        name="Use diet plan template"
        title="Diet Plan From Nov 1"
        description="You’re about to use the following diet plan template"
        alert="This will make John Travolta’s active diet plan this one (Diet Plan From Nov 1) starting from 22/11/2021. This will also change the training split to reference this diet plan. You can make any changes to the training split and diet plan adter you schedule these changes. Additionally you can revert it at any point by re-activating “Balanced Diet” as the active plan."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </ActivityLayout>
  )
}
