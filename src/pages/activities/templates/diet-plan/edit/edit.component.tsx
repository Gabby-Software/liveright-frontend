import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'

import { AddIcon, FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../../components/cards/card/card.component'
import Error from '../../../../../components/form/error/error.component'
import Input from '../../../../../components/form/input/input.component'
import useTemplateDietPlan from '../../../../../hooks/api/templates/diet-plan/useTemplateDietPlan'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage
} from '../../../../../utils/localStorage'
import { Styles } from '../../../styles/edit-plan.styles'
import MealDayAccordion from '../../components/meal-day-accordion/meal-day-accordion.component'
import MainStyles, {
  MealStyles
} from '../../meal/template-meal-form/template-meal-form'

interface EditDietPlanProps {
  editDay?: number
  onClose: () => void
}

const defaultValues: any = {
  name: '',
  save_as_template: false,
  account_id: null,
  scheduled_start_on: '',
  scheduled_end_on: '',
  days: []
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  days: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      activities: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          time: yup.string().nullable(),
          items: yup.array().of(
            yup.object().shape({
              data: yup.object().shape({
                name: yup.string().required(),
                info: yup.object().shape({
                  proteins: yup.string().required(),
                  fat: yup.string().required(),
                  net_carbs: yup.string().required()
                })
              })
            })
          )
        })
      )
    })
  )
})

function createDay(dayIndex: number) {
  return {
    name: `Meals day ${dayIndex}`,
    activities: [],
    save_as_template: false
  }
}

export default function EditDietPlan({ onClose, editDay }: EditDietPlanProps) {
  const [dayIndex, setDayIndex] = useState(0)
  const { clientId, id } = useParams<any>()
  const queryParams = new URLSearchParams(location.search)
  const isMobile = useIsMobile()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [delIdx, setDelIdx] = useState(-1)

  const { dietTemplate, onEdit } = useTemplateDietPlan({ id })

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days'
  })

  useEffect(() => {
    if (clientId) {
      methods.setValue('account_id', parseInt(clientId))
    }
  }, [clientId])

  const handleDayRemove = (index: number) => {
    setDelIdx(index)
  }

  useEffect(() => {
    if (dietTemplate._id) {
      methods.setValue('name', dietTemplate.name)
      methods.setValue('account_id', dietTemplate.account_id)
      if (!queryParams.get('loadDaysFromls')) {
        methods.setValue('days', dietTemplate.days)
      }
    }
  }, [dietTemplate._id])

  useEffect(() => {
    const loadDaysFromls = queryParams.get('loadDaysFromls')
    if (loadDaysFromls) {
      const days = JSON.parse(getItemFromLocalStorage(loadDaysFromls) || 'null')

      if (days) {
        daysArray.remove(
          Array(daysArray.fields.length)
            .fill(1)
            .map((v, i) => i)
        )
        daysArray.append([...days])
      }

      removeItemFromLocalStorage(loadDaysFromls)
    }
    const date = queryParams.get('scheduled_start_on')
    if (date) {
      methods.setValue('scheduled_start_on', date)
    }
  }, [location.search])

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  const handleDayAdd = () => {
    const newDayIndex = dayIndex + 1
    daysArray.append(createDay(newDayIndex))
    methods.clearErrors('days')
    setDayIndex(newDayIndex)
  }

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          <Card className="EditPlan__overview">
            <MealStyles>
              <div className="Meal__header">
                <div className="Meal__header-title">
                  <div className="Meal__header-icon">
                    <FoodIcon />
                  </div>
                  <div className="subtitle">
                    {methods.getValues('name') || 'Diet Plan'}
                  </div>
                </div>

                <Button onClick={handleSave}>Save</Button>
              </div>
            </MealStyles>

            <div className="EditPlan__controls">
              <Controller
                name="name"
                render={({ field: { value, name } }) => (
                  <Input
                    id="edit-training-plan-name"
                    label="Diet Plan Name"
                    placeholder="Name"
                    className={`EditPlan__input ${
                      get(errors, name) ? 'invalid-field' : ''
                    }`}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    // error={errors.name}
                    shouldScrollTo={get(errors, name)}
                  />
                )}
              />

              {/* <Controller
                name="scheduled_start_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-start"
                    placeholder="Pick start date"
                    label="Start date"
                    className="EditPlan__input"
                    disabledPast
                    value={value}
                    onChange={(e, date) => onChange(name, date)}
                    error={errors.scheduled_start_on}
                  />
                )}
              />

              <Controller
                name="scheduled_end_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-end"
                    placeholder="Pick end date"
                    className="EditPlan__input"
                    label="End date"
                    value={value}
                    onChange={(e, date) => onChange(name, date)}
                    error={errors.scheduled_end_on}
                    disabled={!scheduled_start_on}
                    disabledDate={(date: any) =>
                      date.isBefore(scheduled_start_on)
                    }
                  />
                )}
              /> */}
            </div>
          </Card>

          {daysArray.fields.map((day, index) => (
            <MealDayAccordion
              key={day.id}
              index={index}
              defaultOpened={editDay === index}
              onRemove={() => handleDayRemove(index)}
            />
          ))}

          <div className="EditPlan__add-new-day" onClick={handleDayAdd}>
            <AddIcon />
            Add Meal Plan Day
          </div>

          {typeof errors.days === 'object' && !Array.isArray(errors.days) && (
            <Error standalone="Add at least one day" />
          )}
        </Styles>
      </FormProvider>
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Edit Diet Plan"
      headerSpacing={20}
      headerTopComponent={
        <HeaderLink onClick={onClose}>Go Back to Overview</HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    <MainStyles>
      <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
      <h1 className="Title">Editing Diet Plan Template</h1>
      {content}
    </MainStyles>
  )
}
