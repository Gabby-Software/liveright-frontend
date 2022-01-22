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
import AddDietPlan from '../../../diet-plan/add-plan/add-plan.component'
import { Styles } from '../../../styles/plan.styles'
import DietPlanTemplateDayView from '../components/diet-plan-day-template-view'

export default function DietPlan() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [edit, setEdit] = useState<boolean | number>(false)
  const [expandedDayIndex, setExpandedDayIndex] = useState<boolean | number>(
    false
  )
  const { id } = useParams<any>()
  const { dietTemplate } = useTemplateDietPlan(id)
  const params = useParams<any>()
  console.log(dietTemplate)
  const onDelete = () => {}

  if (edit || typeof edit === 'number') {
    return (
      <AddDietPlan
        editDay={typeof edit === 'number' ? edit : undefined}
        editId={id}
        revisionId={params.revisionId}
        onClose={() => setEdit(false)}
      />
    )
  }

  if (expandedDayIndex || typeof expandedDayIndex === 'number') {
    return (
      <DietPlanTemplateDayView
        data={dietTemplate}
        onClose={() => setExpandedDayIndex(false)}
        index={expandedDayIndex as number}
        setIndex={setExpandedDayIndex}
        onEdit={() => {
          setEdit(expandedDayIndex)
          setExpandedDayIndex(false)
        }}
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
            <Title>{dietTemplate.name}</Title>

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
            {dietTemplate?.days?.map((item: any, index: number) => (
              <DayDietPlanCard
                day={item}
                onExpand={() => setExpandedDayIndex(index)}
                key={item._id}
              />
            ))}
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
