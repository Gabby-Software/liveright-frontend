import React, { useState } from 'react'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../components/form/label/label.component'
import RadioGroup from '../../../../components/form/radio-group/radio-group.component'
import Select from '../../../../components/form/select/select.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import WorkoutTemplateDialog from '../../components/dialog/workout-template-dialog/workout-template-dialog.component'
import ActivityLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import { MealCard } from '../../components/meal-card/meal-card.component'
import { Styles } from '../../styles/plan.styles'

const nutrients = [
  { name: 'Calories', value: '120g' },
  { name: 'Carbs', value: '200g' },
  { name: 'Fat', value: '30g' },
  { name: 'Protein', value: '300g' }
]
const plans = [
  {
    id: '123',
    name: 'Meal 1',
    nutrients: [
      { name: 'Calories', value: '20g' },
      { name: 'Carbs', value: '40g' },
      { name: 'Fat', value: '10g' },
      { name: 'Protein', value: '60g' }
    ],
    meals: [
      { name: 'Chicken Brest Tender', value: '100g' },
      { name: 'Brown Rice', value: '50g' },
      { name: 'Red Apple', value: '150g' }
    ]
  },
  {
    id: '124',
    name: 'Meal 2',
    nutrients: [
      { name: 'Calories', value: '70g' },
      { name: 'Carbs', value: '50g' },
      { name: 'Fat', value: '15g' },
      { name: 'Protein', value: '80g' }
    ],
    meals: [
      { name: 'Chicken Brest Tender', value: '120g' },
      { name: 'Brown Rice', value: '60g' },
      { name: 'Red Apple', value: '150g' }
    ]
  }
]
const options = [
  { label: 'Balanced Diet', value: '123' },
  { label: 'Low Fat Diet', value: '124' }
]

export default function MealPlan() {
  const [showConfirm, setShowConfirm] = useState(false)
  const [option, setOption] = useState('existing')
  const [dpOption, setDpOption] = useState('123')
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
            <Title>Low Carb Day</Title>

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

          <section className="PlanPage__summary">
            <p className="label">Total micronutrients from this meal plan</p>
            <div className="nutrients">
              {nutrients.map((item) => (
                <Macronutrient
                  key={item.name}
                  title={item.name}
                  amount={item.value}
                />
              ))}
            </div>
          </section>

          <section className="PlanPage__meals">
            {plans.map((plan) => (
              <MealCard
                key={plan.id}
                name={plan.name}
                nutrients={plan.nutrients}
                meals={plan.meals}
              />
            ))}
          </section>
        </Card>
      </Styles>

      <WorkoutTemplateDialog
        name="Use meal plan template"
        title="Low Carbs Day"
        description="You’re about to use the following meal plan template"
        body={
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="options-todo">
              <p>What do you wish to do?</p>
              <RadioGroup
                align="vertical"
                options={[
                  {
                    label: 'Add to existing diet plan day',
                    value: 'existing',
                    disabled: false
                  },
                  {
                    label: 'Create new diet plan day from this meal plan',
                    value: 'new',
                    disabled: false
                  }
                ]}
                value={option}
                onChange={(e) => setOption(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem'
              }}
            >
              <div style={{ width: '45%' }}>
                <p>Select diet plan</p>
                <Select
                  id="diet-plan-select"
                  options={options}
                  value={dpOption}
                  onChange={(value) => setDpOption(value)}
                />
              </div>
            </div>
            <div
              style={{
                display: 'inline-flex',
                gap: 8,
                margin: '1rem 0',
                padding: '12px 16px',
                borderRadius: 8,
                backgroundColor: '#EDEDED'
              }}
            >
              <div style={{ display: 'inline-flex', marginRight: 16 }}>
                <Checkbox style={{ lineHeight: 1 }} />
                <Label style={{ margin: '0 8px', lineHeight: 1 }}>Day 1</Label>
              </div>
              <div style={{ display: 'inline-flex', marginRight: 16 }}>
                <Checkbox />
                <Label style={{ margin: '0 8px', lineHeight: 1 }}>Day 2</Label>
              </div>
              <div style={{ display: 'inline-flex' }}>
                <Checkbox />
                <Label style={{ margin: '0 8px', lineHeight: 1 }}>Day 3</Label>
              </div>
            </div>
          </div>
        }
        date={{
          label: 'From when should we apply this change',
          value: ''
        }}
        alert="This will make changes to John Travolta’s “Balanced Diet” diet plan, which is currently active and will add this meal plan to day 3 overwriting the current choice. You can make changes to the order and details after confirming below. This will take effect from November 21st."
        yes="Confirm Changes"
        cancel="Nevermind"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </ActivityLayout>
  )
}
