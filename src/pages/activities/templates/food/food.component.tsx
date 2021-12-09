import React, { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import ActivityLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import { Styles } from '../../styles/plan.styles'

const nutrients = [
  { name: 'Calories', value: '120g' },
  { name: 'Carbs', value: '200g' },
  { name: 'Fat', value: '30g' },
  { name: 'Protein', value: '300g' }
]

export default function Meal() {
  const [showConfirm, setShowConfirm] = useState(false)
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
          <section className="PlanPage__header">
            <Title>Delicious Chiecken Bries With Spinach</Title>

            <div className="PlanPage__header-actions">
              <Button variant="dark" className="PlanPage__header-btn">
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

          <section className="PlanPage__summary">
            <p className="label">Micronutrients from this food</p>
            <div className="nutrients">
              {nutrients.map((item) => (
                <Macronutrient
                  key={item.name}
                  title={item.name}
                  amount={item.value}
                />
              ))}
            </div>

            <div className="food-description">
              Generic description of the food
            </div>
          </section>
        </Card>
      </Styles>

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
    </ActivityLayout>
  )
}
