import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Input from '../../../../../components/form/input/input.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import useTemplateMealPlan from '../../../../../hooks/api/templates/useTemplateMealPlan'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import { Styles } from '../../../components/edit-dialog/shared/planday-edit.styles'
import Macronutrient from '../../../components/macronutrient/macronutrient.component'
import MainStyles, {
  MealStyles
} from '../../meal/template-meal-form/template-meal-form'
import MealDayForm from '../component/meal-day-form/meal-day-form.component'

const nutrients = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}
interface TemplateMealPlanFormProps {
  onClose: () => void
}

const defaultValues = {
  mealPlan: { activities: [] }
}

const TemplateMealPlanForm = ({ onClose }: TemplateMealPlanFormProps) => {
  const isMobile = useIsMobile()
  const [dayView, setDayView] = useState(false)
  const { id } = useParams<any>()
  const [totalMacros, setTotalMacros] = useState({
    grams: 0,
    proteins: 0,
    fat: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    total_carbs: 0,
    calories: 0
  })

  const { mealPlan, onEdit } = useTemplateMealPlan({ id })
  const methods = useForm<any>({
    defaultValues
  })

  useEffect(() => {
    if (mealPlan._id) {
      const { activities, ...rest } = mealPlan
      Object.keys(rest).forEach((key) => {
        methods.setValue(`mealPlan.${key}`, mealPlan[key])
      })

      methods.setValue('mealPlan.activities', activities, {
        shouldValidate: true
      })
    }
  }, [mealPlan._id])

  const calculateTotalMacros = () => {
    const activities: any[] = methods.getValues('mealPlan.activities')

    const macros = {
      grams: 0,
      proteins: 0,
      fat: 0,
      net_carbs: 0,
      sugar: 0,
      fiber: 0,
      total_carbs: 0,
      calories: 0
    }

    activities?.forEach((a) => {
      const items = a.items
      items?.forEach((i: any) => {
        const info = i.data.info
        Object.keys(macros).map((k: string) => {
          return ((macros as any)[k] += parseInt(info[k] || 0))
        })
      })
    })

    setTotalMacros(macros)
  }

  methods.watch(() => {
    calculateTotalMacros()
  })

  const handleSave = () => {
    methods.handleSubmit((values) =>
      onEdit(id, values.mealPlan, () => onClose())
    )()
  }

  const content = (
    <Styles>
      <FormProvider {...methods}>
        <MealStyles>
          <div className="Meal__header">
            <div className="Meal__header-title">
              <div className="Meal__header-icon">
                <FoodIcon />
              </div>
              <div className="subtitle">{mealPlan.name || 'MealPlan'}</div>
            </div>

            <Button onClick={handleSave}>Save</Button>
          </div>
        </MealStyles>
        <section className="TSPlanDayEdit__block">
          <Controller
            name={`mealPlan.name`}
            render={({ field: { value, name } }) => (
              <Input
                id="add-meal-plan-name"
                label="Meal Plan Day Name"
                placeholder="Name"
                className="EditPlan__input"
                value={value}
                onChange={(e: any) => methods.setValue(name, e.target.value)}
              />
            )}
          />
        </section>

        <section className="TSPlanDayEdit__block">
          <section className="TSPlanDayEdit__flex">
            <FormToggleUI
              value={dayView}
              onUpdate={() => setDayView(!dayView)}
              className="toggle"
            />
            <p>Day Target</p>
          </section>

          {dayView ? (
            <section className="TSPlanDayEdit__flex-wrap">
              {Object.entries(nutrients).map(([label, key], i) => (
                <Controller
                  key={i}
                  name={`mealPlan.total_target.${key}`}
                  render={({ field: { name, value } }) => (
                    <Input
                      id="add-meal-plan-name"
                      label={`${label} (g)`}
                      placeholder="0"
                      className="EditPlan__input"
                      value={value}
                      onChange={(e: any) =>
                        methods.setValue(name, e.target.value)
                      }
                    />
                  )}
                />
              ))}
            </section>
          ) : (
            <>
              <section className="TSPlanDayEdit__flex">
                {Object.keys(nutrients).map((k) => (
                  <Macronutrient
                    key={k}
                    title={k}
                    amount={`${(totalMacros as any)[(nutrients as any)[k]]}
                  ${k === 'Calories' ? 'KCal' : 'g'}`}
                  />
                ))}
              </section>

              <p className="subtitle">List meals of this diet plan</p>

              <div className="TSPlanDayEdit__meals">
                <MealDayForm name={`mealPlan.activities`} />
              </div>
            </>
          )}
        </section>
      </FormProvider>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="Editing Meal Template"
      headerTopComponent={
        <HeaderLink onClick={onClose}>Go Back to Overview</HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    <MainStyles>
      <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
      <h1 className="Title">Editing Meal Template</h1>
      {content}
    </MainStyles>
  )
}

export default TemplateMealPlanForm
