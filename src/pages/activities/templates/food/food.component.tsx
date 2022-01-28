import { useState } from 'react'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateFood from '../../../../hooks/api/templates/useTemplateFood'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { FoodInfoType } from '../../../../types/food.type'
import TemplateLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import { Styles } from '../../styles/plan.styles'
import TemplateMobilePage from '../components/template-mobile-page/template-mobile-page.component'
import FoodTemplateForm from './template-food-form/template-food-form.component'
const MACROS_KEY_LABEL: { [key: string]: string } = {
  calories: 'Calories',
  net_carbs: 'Net Carbs',
  fat: 'Fat',
  proteins: 'Proteins'
}

export default function Meal() {
  const [edit, setEdit] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}
  const { food } = useTemplateFood({ id: params.id })

  console.log(food, 'food', params.id)

  if (edit) {
    return <FoodTemplateForm onClose={() => setEdit(false)} />
  }

  const content = (
    <>
      <section className="PlanPage__summary">
        <p className="label">Micronutrients from this food</p>
        <div className="nutrients">
          {Object.keys(MACROS_KEY_LABEL).map((k) => (
            <Macronutrient
              key={k}
              title={MACROS_KEY_LABEL[k]}
              amount={`${food?.info?.[k as keyof FoodInfoType]}${
                k === 'calories' ? 'kcal' : 'g'
              }`}
            />
          ))}
        </div>

        <div className="food-description">Generic description of the food</div>
      </section>
      <Dialog
        open={showConfirm}
        title="Use food template"
        onClose={() => setShowConfirm(false)}
      >
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          To use this food, search for its name within any meal .
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => setShowConfirm(false)}>Ok, got it</Button>
        </div>
      </Dialog>
    </>
  )

  return isMobile ? (
    <TemplateMobilePage
      contentTitle={food.name}
      pageTitle={'Food Detail'}
      actionComponent={
        <Button
          className="PlanPage__header-btn"
          onClick={() => setShowConfirm(true)}
        >
          Use Food Template
        </Button>
      }
      onDelete={onDelete}
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
            <Title>{food.name}</Title>

            <div className="PlanPage__header-actions">
              <Button
                variant="dark"
                className="PlanPage__header-btn"
                onClick={() => setEdit(true)}
              >
                Edit Food Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Food Template
              </Button>
            </div>
          </section>

          <section className="PlanPage__divider" />
          {content}
        </Card>
      </Styles>
    </TemplateLayout>
  )
}
