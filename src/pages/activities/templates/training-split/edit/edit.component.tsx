import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { AddIcon, FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../../components/cards/card/card.component'
import Checkbox from '../../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../../components/form/input/input.component'
import Label from '../../../../../components/form/label/label.component'
import Select from '../../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import { Subtitle } from '../../../../../components/typography'
import useDietPlan from '../../../../../hooks/api/activities/useDietPlan'
import useDietPlans from '../../../../../hooks/api/activities/useDietPlans'
import useTrainingPlan from '../../../../../hooks/api/activities/useTrainingPlan'
import useTrainingPlans from '../../../../../hooks/api/activities/useTrainingPlans'
import useTemplateTrainingSplit from '../../../../../hooks/api/templates/training-splits/useTemplateTrainingSplit'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import { getActiveOrLatestRev } from '../../../../../utils/api/activities'
import Counter from '../../../components/counter/counter.component'
import DaySplitEditFocusView from '../../../components/day-split-edit-focus-view/day-split-edit-focus-view.component'
import DayTrainingSplitEditCard from '../../../components/day-training-split-edit-card/day-training-split-edit-card.component'
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
  save_as_template: true,
  account_id: null,
  scheduled_start_on: '',
  scheduled_end_on: '',
  days: []
}

function createDay(
  dayIndex: number,
  training_plan_day: any = {
    name: ''
  },
  diet_plan_day: any = {
    name: ''
  }
) {
  return {
    name: `Day ${dayIndex}`,
    items: [],
    training_plan_day,
    diet_plan_day
  }
}

export default function EditTrainingSplit({ onClose }: EditTrainingSplitProps) {
  const params = useParams<any>()
  const { clientId } = params
  const isMobile = useIsMobile()
  const [dayView, setDayView] = useState(false)
  const [dayCount, setDayCount] = useState(0)

  const [editMealPlan, setEditMealPlan] = useState('')
  const [editWorkout, setEditWorkout] = useState('')
  const [selectedTP, setSelectedTP] = useState('')
  const [selectedDP, setSelectedDP] = useState('')

  const methods = useForm<any>({
    defaultValues
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days' as never,
    keyName: 'id'
  })

  const { errors } = methods.formState

  const { trainingPlans } = useTrainingPlans({ clientId: clientId })

  const { dietPlans } = useDietPlans({ clientId: clientId })

  const { revision: tpRev } = useTrainingPlan({
    id: selectedTP,
    revisionId: getActiveOrLatestRev(
      trainingPlans.find((tp) => tp._id === selectedTP) || { revisions: [] }
    )?._id
  })
  const { revision: dpRev } = useDietPlan({
    id: selectedDP,
    revisionId: getActiveOrLatestRev(
      dietPlans.find((dp) => dp._id === selectedDP) || { revisions: [] }
    )?._id
  })

  const { trainingSplit, onEdit } = useTemplateTrainingSplit({
    id: params.id
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
    if (daysArray.fields.length > 0) {
      for (let i = 0; i < daysArray.fields.length; i++) {
        daysArray.remove(0)
      }
    }
    const dpDays = dpRev.days
    const tpDays = tpRev.days

    for (let i = 0; i < (isNaN(diff) ? dayCount : diff); i++) {
      daysArray.append(
        createDay(
          (i % dayCount) + 1,
          tpDays?.[i % tpDays.length],
          dpDays?.[i % dpDays.length]
        )
      )
    }
  }, [dayCount, tpRev._id, dpRev._id, diff])

  useEffect(() => {
    if (trainingSplit._id) {
      methods.setValue('account_id', trainingSplit.account_id)
      methods.setValue(
        'scheduled_start_on',
        trainingSplit.scheduled_start_on || ''
      )
      methods.setValue('scheduled_end_on', trainingSplit.scheduled_end_on || '')
      daysArray.remove(
        Array(daysArray.fields.length)
          .fill(1)
          .reduce((acc, v, i) => [...acc, i], [])
      )
      daysArray.append(trainingSplit.days)
      setDayCount(trainingSplit.days_count)
      setSelectedTP(trainingSplit.training_plan?._id || '')
      setSelectedDP(trainingSplit.diet_plan?._id || '')
    }

    if (trainingSplit._id) {
      methods.setValue('name', trainingSplit.name)
    }
  }, [trainingSplit._id, trainingSplit._id])

  const handleSave = () => {
    methods.handleSubmit((values) =>
      onEdit(params.id, values, () => onClose())
    )()
  }

  const handleDayAdd = () => {
    if (dayCount < diff || isNaN(diff)) {
      setDayCount(dayCount + 1)
    }
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

  const tpOptions = useMemo(() => {
    const options = trainingPlans.map((tp) => ({
      label: tp.name,
      value: tp._id
    }))
    options.unshift({ label: 'No Select', value: '' })
    return options
  }, [trainingPlans])

  const dpOptions = useMemo(() => {
    const options = dietPlans.map((dp) => ({
      label: dp.name,
      value: dp._id
    }))
    options.unshift({ label: 'No Select', value: '' })
    return options
  }, [dietPlans])

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
                maxValue={diff}
                value={dayCount}
                onChange={(value) => setDayCount(value)}
              />

              <Controller
                name="scheduled_start_on"
                render={({ field: { value, name } }) => (
                  <DatePicker
                    id="add-split-date"
                    placeholder="Pick start date"
                    label="Start date"
                    disabledPast
                    value={value}
                    onChange={(e, date) => onChange(name, date)}
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
                        Math.max(dayCount - 1, 0),
                        'days'
                      )
                    }
                    value={value}
                    onChange={(e, date) => onChange(name, date)}
                    error={errors.scheduled_start_on}
                  />
                )}
              />

              <Controller
                render={({ field: { value, name } }) => (
                  <div className="AddTrainingSplit__cards-checkbox-container">
                    <Checkbox
                      className="AddTrainingSplit__cards-checkbox"
                      checked={value}
                      onChange={(e) => methods.setValue(name, e.target.checked)}
                    />
                    <Label className="AddTrainingSplit__cards-checkbox-label">
                      Save Training Split as template
                    </Label>
                  </div>
                )}
                name={`save_as_template`}
              />
            </div>
          </Card>

          <Card className="AddTrainingSplit__card">
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
                value={selectedDP}
                onChange={(value) => {
                  setSelectedDP(value)
                  methods.setValue(
                    'diet_plan_revision_id',
                    getActiveOrLatestRev(
                      dietPlans.find((dp) => dp._id === value)
                    )?._id
                  )
                }}
                options={dpOptions}
              />
              <Select
                id="add-split-Training-plan"
                label="Training plan"
                placeholder="Select training plan"
                value={selectedTP}
                onChange={(value) => {
                  setSelectedTP(value)
                  methods.setValue(
                    'training_plan_revision_id',
                    getActiveOrLatestRev(
                      trainingPlans.find((tp) => tp._id === value)
                    )?._id
                  )
                }}
                options={tpOptions}
              />
            </div>
          </Card>

          <Card className="AddTrainingSplit__card">
            <div className="AddTrainingSplit__cards-title-container">
              <Subtitle className="AddTrainingSplit__cards-title">
                Edit your split
              </Subtitle>

              <div className="AddTrainingSplit__cards-toggle-container">
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
              </div>
            </div>

            {dayView ? (
              <DaySplitEditFocusView
                maxDays={dayCount}
                tpActivities={tpRev.days}
                dpDays={dpRev.days}
                handleDayAdd={handleDayAdd}
              />
            ) : (
              <>
                <div className="AddTrainingSplit__cards">
                  {daysArray.fields.map((day, i) => (
                    <DayTrainingSplitEditCard
                      key={day.id}
                      name={`days.${i}`}
                      tpWorkouts={tpRev.days}
                      dpDays={dpRev.days}
                      day={`Day ${i + 1}`}
                      edit
                      onWorkout={handleWorkout}
                      onMealPlan={handleMealPlan}
                      onCardio={() => {}}
                      subtitle={moment(
                        startDate.setDate(startDate.getDate() + 1)
                      ).format('dddd')}
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
              </>
            )}
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
