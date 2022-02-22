import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch
} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'

import { AddIcon, FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../../components/cards/card/card.component'
import Input from '../../../../../components/form/input/input.component'
import { toast } from '../../../../../components/toast/toast.component'
import { Subtitle } from '../../../../../components/typography'
import useTemplateTrainingSplit from '../../../../../hooks/api/templates/training-splits/useTemplateTrainingSplit'
import useTemplateExercises from '../../../../../hooks/api/templates/useTemplateExercises'
import useTemplateMealPlans from '../../../../../hooks/api/templates/useTemplateMealPlans'
import useTemplateWorkouts from '../../../../../hooks/api/templates/workouts/useTemplateWorkouts'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import Counter from '../../../components/counter/counter.component'
import DayTrainingSplitEditCard from '../../../components/day-training-split-edit-card/day-training-split-edit-card.component'
import CardioEditDialog from '../../../components/edit-dialog/cardio/cardio-edit-dialog.component'
import MealPlanEditDialog from '../../../components/edit-dialog/mealplan/mealplanday-edit-dialog.component'
import WorkoutEditDialog from '../../../components/edit-dialog/workoutday/workoutday-edit-dialog.component'
import MainStyles, {
  MealStyles
} from '../../meal/template-meal-form/template-meal-form'
import { Styles } from './edit-split.styles'

interface EditTrainingSplitProps {
  onClose: any
}

const defaultValues: any = {
  name: '',
  save_as_template: false,
  account_id: null,
  scheduled_start_on: null,
  scheduled_end_on: null,
  days: []
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  scheduled_start_on: yup.date().nullable(),
  scheduled_end_on: yup
    .date()
    .min(yup.ref('scheduled_start_on'), "End date can't be before start date")
    .nullable()
  // days: yup.array().min(1)
})

function createDay(
  dayIndex: number,
  training_plan_activities: any[] = [],
  diet_plan_day: any = null
) {
  return {
    name: `Day ${dayIndex}`,
    items: [],
    training_plan_activities,
    diet_plan_day
  }
}

export default function EditTrainingSplit({ onClose }: EditTrainingSplitProps) {
  const params = useParams<any>()
  // const { clientId } = params
  const isMobile = useIsMobile()

  const [editMealPlan, setEditMealPlan] = useState('')
  const [editWorkout, setEditWorkout] = useState('')
  const [editCardio, setEditCardio] = useState('')

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days' as never,
    keyName: 'id'
  })

  const { errors } = methods.formState

  // const { trainingPlans } = useTrainingPlans({ clientId: clientId })

  // const { dietPlans } = useDietPlans({ clientId: clientId })

  const { trainingSplit, onEdit } = useTemplateTrainingSplit({
    id: params.id
  })

  const { workouts: templateWorkouts } = useTemplateWorkouts({
    clientId: 'all'
  })
  const { mealPlans: templateMealPlans } = useTemplateMealPlans({
    clientId: 'all'
  })
  const { exercises: templateCardios } = useTemplateExercises({
    clientId: 'all',
    type: 'cardio'
  })

  const [scheduled_start_on] = useWatch({
    control: methods.control,
    name: ['scheduled_start_on']
  })

  const startOnDate = methods.getValues('scheduled_start_on')
  const startDate =
    startOnDate !== null && startOnDate !== ''
      ? new Date(startOnDate)
      : new Date()

  const endDate = new Date(
    methods.getValues('scheduled_end_on') === null
      ? ''
      : methods.getValues('scheduled_end_on')
  )
  const diff = moment(endDate).diff(startDate, 'days') + 1

  startDate.setDate(startDate.getDate() - 1)

  useEffect(() => {
    if (trainingSplit._id) {
      methods.setValue('name', trainingSplit.name)
      methods.setValue('account_id', trainingSplit.account_id)
      // methods.setValue(
      //   'scheduled_start_on',
      //   trainingSplit.scheduled_start_on || ''
      // )
      // methods.setValue('scheduled_end_on', trainingSplit.scheduled_end_on || '')
      daysArray.remove(
        Array(daysArray.fields.length)
          .fill(1)
          .reduce((acc, v, i) => [...acc, i], [])
      )
      daysArray.append(trainingSplit.days)
    }
  }, [trainingSplit._id])

  const handleSave = async () => {
    const isValid = await methods.trigger()
    if (!isValid) {
      toast.show({
        type: 'error',
        msg: 'Please fill out all the required fields'
      })
      return
    }
    methods.handleSubmit((values) =>
      onEdit(params.id, values, () => onClose())
    )()
  }

  const handleDayAdd = () => {
    if (diff) {
      if (daysArray.fields.length < diff) {
        daysArray.append(createDay(daysArray.fields.length + 1))
      }
    } else {
      daysArray.append(createDay(daysArray.fields.length + 1))
    }
  }

  const handleDayRemove = (index: number) => {
    daysArray.remove(index)
  }

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const handleMealPlan = (name: string) => {
    setEditMealPlan(name)
  }

  const handleWorkout = (name: string) => {
    setEditWorkout(name)
  }

  const handleCardio = (name: string) => {
    setEditCardio(name)
  }

  // const tpOptions = useMemo(() => {
  //   const options = trainingPlans.map((tp) => ({
  //     label: tp.name,
  //     value: tp._id
  //   }))
  //   options.unshift({ label: 'No Select', value: '' })
  //   return options
  // }, [trainingPlans])

  // const dpOptions = useMemo(() => {
  //   const options = dietPlans.map((dp) => ({
  //     label: dp.name,
  //     value: dp._id
  //   }))
  //   options.unshift({ label: 'No Select', value: '' })
  //   return options
  // }, [dietPlans])

  const tpWorkout = useMemo(() => {
    return [
      ...templateWorkouts.map((tw) => ({ ...tw, fromTemplate: true }))
    ].filter((w) => !!w)
  }, [templateWorkouts])

  const dpMeals = useMemo(() => {
    return [
      ...templateMealPlans.map((tw) => ({ ...tw, fromTemplate: true }))
    ].filter((m) => !!m)
  }, [templateMealPlans])

  const cardios = useMemo(() => {
    return [
      ...templateCardios.map((tw) => ({
        ...tw,
        fromTemplate: true,
        data: tw
      }))
    ].filter((m) => !!m)
  }, [templateCardios])

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          <Card className="AddTrainingSplit__card">
            <MealStyles>
              <div className="Meal__header">
                <div className="Meal__header-title">
                  <div className="Meal__header-icon">
                    <FoodIcon />
                  </div>
                  <div className="subtitle">
                    {trainingSplit.name || 'Training Split'}
                  </div>
                </div>

                <Button onClick={handleSave}>Save</Button>
              </div>
            </MealStyles>

            <Subtitle className="AddTrainingSplit__subtitle">
              General Info
            </Subtitle>

            <div className="AddTrainingSplit__name-controls">
              <Controller
                name="name"
                render={({ field: { value, name } }) => (
                  <Input
                    id="add-split-name"
                    label="Name your training split"
                    placeholder="Training Split Created 2021"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    error={errors.name}
                  />
                )}
              />
            </div>

            <div className="AddTrainingSplit__info-controls">
              <Counter
                disableInputChange
                maxValue={diff}
                value={daysArray.fields.length}
                onChange={() => {}}
                onIncrease={() => handleDayAdd()}
                onDecrease={() => handleDayRemove(daysArray.fields.length - 1)}
              />

              {/* <Controller
                name="scheduled_start_on"
                render={({ field: { value, name } }) => (
                  <DatePicker
                    id="add-split-date"
                    placeholder="Pick start date"
                    label="Start date"
                    disabledPast
                    value={value || ''}
                    onChange={(e, date) =>
                      onChange(name, date === '' ? null : date)
                    }
                    error={errors.scheduled_start_on}
                  />
                )}
              />

              <Controller
                name="scheduled_end_on"
                render={({ field: { value, name } }) => (
                  <DatePicker
                    id="add-split-date"
                    placeholder="Pick end date"
                    label="End date"
                    disabledDate={(date) =>
                      date <
                      moment(methods.getValues('scheduled_start_on')).add(
                        Math.max(daysArray.fields.length, 0),
                        'days'
                      )
                    }
                    value={value || ''}
                    onChange={(e, date) =>
                      onChange(name, date === '' ? null : date)
                    }
                    error={errors.scheduled_end_on}
                    disabled={
                      !scheduled_start_on ||
                      !methods.getValues('scheduled_start_on')
                    }
                  />
                )}
              /> */}
            </div>
          </Card>

          {/* <Card className="AddTrainingSplit__card">
            <Subtitle className="AddTrainingSplit__link-title">
              Link your existing training plan and diet plan (Optional)
            </Subtitle>
            <p className="AddTrainingSplit__link-text">
              Any changes you make on your diet and training plans will be
              reflected in your training split and vice versa. Don’t want to
              link? No worries, we’ll create a new training and diet plan for
              you!
            </p>

            <div className="AddTrainingSplit__link-controls">
              <Select
                id="add-split-Diet-plan"
                label="Diet plan"
                placeholder="Select diet plan"
                value={selectedDP.id}
                onChange={onDPChange}
                options={dpOptions}
              />
              <Select
                id="add-split-Training-plan"
                label="Training plan"
                placeholder="Select training plan"
                value={selectedTP.id}
                onChange={onTPChange}
                options={tpOptions}
              />
            </div>
          </Card> */}

          <Card className="AddTrainingSplit__card">
            <div className="AddTrainingSplit__cards-title-container">
              <Subtitle className="AddTrainingSplit__cards-title">
                Edit your split
              </Subtitle>

              {/* <div className="AddTrainingSplit__cards-toggle-container">
                <p className="AddTrainingSplit__cards-toggle-label">
                  All Day View
                </p>
                <FormToggleUI
                  className="AddTrainingSplit__cards-toggle"
                  value={dayView}
                  onUpdate={() => setDayView(!dayView)}
                />
                <p className="AddTrainingSplit__cards-toggle-label">
                  Focused Day View
                </p>
              </div> */}
            </div>

            {/* {dayView ? (
              <DaySplitEditFocusView
                maxDays={dayCount}
                tpActivities={tpRev.days}
                dpDays={dpRev.days}
                handleDayAdd={handleDayAdd}
              />
            ) : (
              <> */}
            <div className="AddTrainingSplit__cards">
              {daysArray.fields.map((day, i) => (
                <DayTrainingSplitEditCard
                  key={day.id}
                  name={`days.${i}`}
                  tpWorkouts={tpWorkout}
                  dpDays={dpMeals}
                  cardios={cardios}
                  day={`Day ${i + 1}`}
                  edit
                  onWorkout={handleWorkout}
                  onMealPlan={handleMealPlan}
                  onCardio={handleCardio}
                  subtitle={
                    scheduled_start_on
                      ? moment(scheduled_start_on).add(i, 'days').format('dddd')
                      : ''
                  }
                />
              ))}

              <div
                className="AddTrainingSplit__card-add"
                onClick={handleDayAdd}
              >
                <AddIcon />
                Add More Days
              </div>
            </div>
            {/* </>
            )} */}
          </Card>
        </Styles>

        {editWorkout && (
          <WorkoutEditDialog
            open={!!editWorkout}
            onClose={() => setEditWorkout('')}
            name={editWorkout}
          />
        )}

        {editMealPlan && (
          <MealPlanEditDialog
            open={!!editMealPlan}
            onClose={() => setEditMealPlan('')}
            name={editMealPlan}
          />
        )}

        {editCardio && (
          <CardioEditDialog
            open={!!editCardio}
            onClose={() => setEditCardio('')}
            name={editCardio}
          />
        )}
      </FormProvider>
    </>
  )

  return isMobile ? (
    <MobilePage
      title={'Editing Training Split'}
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
      <h1 className="Title">Editing Meal Template</h1>
      {content}
    </MainStyles>
  )
}
