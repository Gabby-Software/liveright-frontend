import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import { Routes } from '../../../../../enums/routes.enum'
import useTemplateDietPlan from '../../../../../hooks/api/templates/diet-plan/useTemplateDietPlan'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import DayDietPlanCard from '../../../components/day-diet-plan-card/day-diet-plan-card.component'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import TemplateLayout from '../../../components/layout/layout.component'
import { Styles } from '../../../styles/plan.styles'
import TemplateMobilePage from '../../components/template-mobile-page/template-mobile-page.component'
import DietPlanTemplateDayView from '../components/diet-plan-day-template-view'
import EditDietPlan from '../edit/edit.component'

export default function DietPlan() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [edit, setEdit] = useState<boolean | number>(false)
  const [expandedDayIndex, setExpandedDayIndex] = useState<boolean | number>(
    false
  )
  const isMobile = useIsMobile()
  const { id } = useParams<any>()
  const { dietTemplate } = useTemplateDietPlan({ id })
  console.log(dietTemplate)
  const onDelete = () => {}

  const content = (
    <>
      <div className="PlanPage__cards">
        {dietTemplate?.days?.map((item: any, index: number) => (
          <DayDietPlanCard
            day={item}
            onExpand={() => setExpandedDayIndex(index)}
            onMealClick={() => {}}
            key={item._id}
            border="both"
          />
        ))}
      </div>
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
    </>
  )

  if (edit || typeof edit === 'number') {
    return (
      <EditDietPlan
        editDay={typeof edit === 'number' ? edit : undefined}
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

  return isMobile ? (
    <TemplateMobilePage
      pageTitle="Diet Plan Template Detail"
      contentTitle={dietTemplate.name}
      actionComponent={
        <Button
          className="PlanPage__header-btn"
          onClick={() => setShowConfirm(true)}
        >
          Use Diet Template
        </Button>
      }
      onDelete={onDelete}
      onEdit={() => setEdit(0)}
    >
      <Styles>{content}</Styles>
    </TemplateMobilePage>
  ) : (
    <TemplateLayout>
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
              <Button
                variant="dark"
                className="PlanPage__header-btn"
                onClick={() => setEdit(0)}
              >
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
          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  )
}
