import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import MobileBack from '../../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../../components/typography'
import { Routes } from '../../../../../enums/routes.enum'
import useTemplateTrainingPlan from '../../../../../hooks/api/templates/training-plans/useTemplateTrainingPlan'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import DayTrainingPlanCard from '../../../components/day-training-plan-card/day-training-plan-card.component'
import SplitTemplateDialog from '../../../components/dialog/use-template-dialog/use-template-dialog.component'
import TemplateLayout from '../../../components/layout/layout.component'
import { Styles } from '../../../styles/plan.styles'
import TemplateMobilePage from '../../components/template-mobile-page/template-mobile-page.component'

export default function TrainingPlan() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const { trainingTemplate } = useTemplateTrainingPlan(params.id)

  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}

  console.log(trainingTemplate.days)

  const content = (
    <>
      <div className="PlanPage__cards">
        {trainingTemplate?.days?.map((day: any, i) => (
          <DayTrainingPlanCard day={day} border="both" key={i} />
        ))}
      </div>
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
    </>
  )

  return isMobile ? (
    <TemplateMobilePage
      pageTitle="Training Plan Template Detail"
      contentTitle={trainingTemplate.name}
      actionComponent={
        <Button
          className="PlanPage__header-btn"
          onClick={() => setShowConfirm(true)}
        >
          Use Template
        </Button>
      }
      onDelete={onDelete}
      onEdit={() => {}}
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
            <Title>{trainingTemplate?.name}</Title>

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
          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  )
}
