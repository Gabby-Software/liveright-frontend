import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import { LabelDivider } from '../../../../components/label-divider/label-divider.styles'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useTemplateMeal from '../../../../hooks/api/templates/meals/useTemplateMeal'
import ActivityLayout from '../../components/layout/layout.component'
import Macronutrient from '../../components/macronutrient/macronutrient.component'
import { Styles } from '../../styles/plan.styles'
import TemplateMealForm from './template-meal-form/template-meal-form.component'

const MACROS_KEY_LABEL: { [key: string]: string } = {
  calories: 'Calories',
  net_carbs: 'Net Carbs',
  fat: 'Fat',
  proteins: 'Proteins'
}

export default function Meal() {
  const [edit, setEdit] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const history = useHistory()
  const { id } = useParams<any>()
  const { meal, onDelete } = useTemplateMeal({ id })

  if (edit) {
    return <TemplateMealForm onClose={() => setEdit(false)} />
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

          <Button
            variant="text"
            onClick={() => setConfirmDelete(true)}
            className="topbar-delete"
          >
            <DeleteOutlinedIcon style={{ marginRight: 8 }} />
            Delete Template
          </Button>
        </section>

        <Card className="PlanPage__card">
          <section className="PlanPage__header">
            <Title>{meal.name}</Title>

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
              {Object.keys(MACROS_KEY_LABEL).map((k) => (
                <Macronutrient
                  key={k}
                  title={MACROS_KEY_LABEL[k]}
                  amount={`${meal.total_target?.[k]}${
                    k === 'calories' ? 'kcal' : 'g'
                  }`}
                />
              ))}
            </div>

            <LabelDivider>List Food</LabelDivider>

            <div className="foods">
              {meal.items?.map((food: any) => (
                <div className="meal-food" key={food._id}>
                  <span>{food.data?.name}</span>
                  &nbsp;-&nbsp;
                  <span>{food.data?.info?.grams}g</span>
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
      <Dialog
        open={confirmDelete}
        title="Delete meal template"
        onClose={() => setConfirmDelete(false)}
      >
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Are you sure you want to delete the template? You will not be able to
          recover it later!
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button
            onClick={() => {
              onDelete(id, () => {
                history.push(Routes.ACTIVITIES_TM)
              })
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </ActivityLayout>
  )
}
