import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import { LabelDivider } from '../../../../components/label-divider/label-divider.styles'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateMealPlan from '../../../../hooks/api/templates/useTemplateMealPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { FoodInfoType } from '../../../../types/food.type'
import TemplateLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import SplitDayMealCard from '../../components/split-day-meal-card/split-day-meal-card.component'
import { Styles } from '../../styles/plan.styles'
import TemplateMobilePage from '../components/template-mobile-page/template-mobile-page.component'
import MealPlanUseTemplateDialog from './use-template-dialog/mealplan-use-template-dialog'

const MACROS_KEY_LABEL: { [key: string]: string } = {
  proteins: 'Proteins',
  fat: 'Fat',
  net_carbs: 'Net Carbs',
  sugar: 'Sugar',
  fiber: 'Fiber',
  total_carbs: 'Total Carbs',
  calories: 'Calories'
}

export default function MealPlan() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  // const [edit, setEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { mealPlan } = useTemplateMealPlan({ id: params.id })

  // if (edit) {
  //   return <TemplateMealPlanForm onClose={() => setEdit(false)} />
  // }
  // console.log(edit)

  const onDelete = () => {}

  const content = (
    <>
      <section className="PlanPage__summary">
        <p className="label">Total micronutrients from this meal plan</p>
        <div className="nutrients">
          {Object.keys(MACROS_KEY_LABEL).map((k) => (
            <Macronutrient
              key={k}
              title={MACROS_KEY_LABEL[k]}
              amount={`${mealPlan?.total_target?.[
                k as keyof FoodInfoType
              ].toFixed(2)} ${k === 'calories' ? 'kcal' : 'g'}`}
            />
          ))}
        </div>
      </section>

      <LabelDivider>List Meal</LabelDivider>

      {mealPlan.activities?.map((a: any, i: number) => (
        <SplitDayMealCard key={i} data={a} />
      ))}
      <MealPlanUseTemplateDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </>
  )

  return isMobile ? (
    <TemplateMobilePage
      contentTitle={mealPlan.name}
      pageTitle={'Meal Plan Detail'}
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
          <section className="PlanPage__header">
            <Title>{mealPlan.name}</Title>

            <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
                Edit Meal Plan Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Meal Plan Template
              </Button>
            </div>
          </section>

          <div className="PlanPage__divider" />
          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  )
}
