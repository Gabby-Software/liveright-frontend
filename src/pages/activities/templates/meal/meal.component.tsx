import React, { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import { LabelDivider } from '../../../../components/label-divider/label-divider.styles'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import ActivityLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import { Styles } from '../../styles/plan.styles'
import TemplateMealForm from './template-meal-form/template-meal-form.component'

const nutrients = [
  { name: 'Calories', value: '120g' },
  { name: 'Carbs', value: '200g' },
  { name: 'Fat', value: '30g' },
  { name: 'Protein', value: '300g' }
]
const foods = [
  { name: 'Chicken Brest Tender', value: '100g' },
  { name: 'Brown Rice', value: '50g' },
  { name: 'Red Apple', value: '150g' }
]
export default function Meal() {
  const [edit, setEdit] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const onDelete = () => {}

  if (edit) {
    return <TemplateMealForm />
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
          <section className="PlanPage__header">
            <Title>Delicious Chiecken Bries With Spinach</Title>

            <div className="PlanPage__header-actions">
              <Button
                variant="dark"
                className="PlanPage__header-btn"
                onClick={() => setEdit(true)}
              >
                Edit Meal Template
              </Button>
              <Button
                className="PlanPage__header-btn"
                onClick={() => setShowConfirm(true)}
              >
                Use Meal Template
              </Button>
            </div>
          </section>

          <section className="PlanPage__divider" />

          <section className="PlanPage__summary">
            <p className="label">Micronutrients from this meal</p>
            <div className="nutrients">
              {nutrients.map((item) => (
                <Macronutrient
                  key={item.name}
                  title={item.name}
                  amount={item.value}
                />
              ))}
            </div>

            <LabelDivider>List Food</LabelDivider>

            <div className="foods">
              {foods.map((food) => (
                <div className="meal-food" key={food.name}>
                  <span>{food.name}</span>
                  &nbsp;-&nbsp;
                  <span>{food.value}</span>
                </div>
              ))}
            </div>
          </section>
        </Card>
      </Styles>

      <Dialog
        open={showConfirm}
        title="Use meal template"
        onClose={() => setShowConfirm(false)}
      >
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          To use this meal, search for its name within any meal plan.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => setShowConfirm(false)}>Ok, got it</Button>
        </div>
      </Dialog>
    </ActivityLayout>
  )
}
