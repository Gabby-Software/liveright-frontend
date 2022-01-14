import moment from 'moment'
import { useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import Select from '../../../../components/form/select/select.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useDietPlan from '../../../../hooks/api/activities/useDietPlan'
import useDietPlans from '../../../../hooks/api/activities/useDietPlans'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import useTrainingPlans from '../../../../hooks/api/activities/useTrainingPlans'
import useTrainingSplit from '../../../../hooks/api/activities/useTrainingSplit'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import Counter from '../../components/counter/counter.component'
import DaySplitEditFocusView from '../../components/day-split-edit-focus-view/day-split-edit-focus-view.component'
import DayTrainingSplitEditCard from '../../components/day-training-split-edit-card/day-training-split-edit-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import MealPlanEditDialog from '../../components/edit-dialog/mealplan/mealplanday-edit-dialog.component'
import WorkoutEditDialog from '../../components/edit-dialog/workoutday/workoutday-edit-dialog.component'
import { Styles } from './edit-split.styles'

const defaultValues: any = {
  name: '',
  training_plan_revision_id: '',
  diet_plan_revision_id: '',
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

function getLatestRevision(plan: any) {
  return plan?.revisions?.[plan.revisions?.length - 1]
}
interface EditTrainingSplitProps {
  data?: any
}
export default function EditTrainingSplit(props: EditTrainingSplitProps) {
  const { data } = props
  const history = useHistory()
  const params = useParams<any>()
  const { clientId } = params
  const isMobile = useIsMobile()
  const [dayView, setDayView] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
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
    revisionId: getLatestRevision(
      trainingPlans.find((tp) => tp._id === selectedTP)
    )?._id
  })
  const { revision: dpRev } = useDietPlan({
    id: selectedDP,
    revisionId: getLatestRevision(dietPlans.find((dp) => dp._id === selectedDP))
      ?._id
  })

  const { trainingSplit, revision, onAdd, onEdit } = useTrainingSplit({
    clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  // console.log({ tpRev, dpRev, values: methods.getValues() })

  useEffect(() => {
    let tempId = 0
    if (tpRev && Object.keys(tpRev).length !== 0) {
      tempId = tpRev.account_id
    } else if (dpRev && Object.keys(dpRev).length !== 0) {
      tempId = dpRev.account_id
    }

    if (tempId > 0 && tempId.toString() !== clientId) {
      const path = history.location.pathname.replace(
        clientId,
        tempId.toString()
      )
      history.push(path)
    }

    if (
      tpRev &&
      Object.keys(tpRev).length !== 0 &&
      dpRev &&
      Object.keys(dpRev).length !== 0
    ) {
      const maxDays = Math.max(tpRev.days?.length, dpRev.days?.length)
      const dpDays = dpRev.days
      const tpDays = tpRev.days

      if (daysArray.fields.length > 0) {
        for (let i = 0; i < daysArray.fields.length; i++) {
          daysArray.remove(0)
        }
      }

      for (let i = 0; i < maxDays; i++) {
        daysArray.append(createDay(i + 1, tpDays[i], dpDays[i]))
      }

      if (maxDays > 0 && !isNaN(maxDays)) {
        setDayCount(maxDays)
      }
    }
  }, [tpRev, dpRev])

  useEffect(() => {
    if (revision._id) {
      methods.setValue('name', trainingSplit.name)
      methods.setValue('account_id', trainingSplit.account_id)
      methods.setValue(
        'training_plan_revision_id',
        revision.training_plan_revision_id
      )
      methods.setValue('diet_plan_revision_id', revision.diet_plan_revision_id)
      methods.setValue('scheduled_start_on', revision.scheduled_start_on)
      methods.setValue('scheduled_end_on', revision.scheduled_end_on)
      methods.setValue('days', revision.days)
      setDayCount(revision.days_count)
      setSelectedTP(
        trainingPlans.find(
          (tp) =>
            getLatestRevision(tp)?._id === revision.training_plan_revision_id
        )?._id || ''
      )
      setSelectedDP(
        dietPlans.find(
          (dp) => getLatestRevision(dp)?._id === revision.diet_plan_revision_id
        )?._id || ''
      )
    }
  }, [revision._id])

  const handleSubmit = (values: any) => {
    if (trainingSplit._id && revision._id) {
      onEdit(trainingSplit._id, revision._id, values, null)
    } else {
      console.log(values)
      onAdd(values, null)
    }
  }

  const startDate = new Date(methods.getValues('scheduled_start_on'))
  startDate.setDate(startDate.getDate() - 1)

  const handleSave = () => {
    methods.handleSubmit(handleSubmit)()
  }

  const handleDayAdd = () => {
    daysArray.append(createDay(daysArray.fields.length + 1))
    methods.clearErrors('days')
    setDayCount(daysArray.fields.length + 1)
  }

  const handleDays = (value: number) => {
    if (value > daysArray.fields.length) {
      for (let i = 1; i <= value - daysArray.fields.length; i++) {
        daysArray.append(createDay(daysArray.fields.length + i))
        methods.clearErrors('days')
        setDayCount(daysArray.fields.length + i)
      }
    } else {
      for (let i = 1; i <= daysArray.fields.length - value; i++) {
        daysArray.remove(daysArray.fields.length - i)
        setDayCount(daysArray.fields.length - i)
      }
    }
  }

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const handleMealPlan = (name: string) => {
    if (isMobile) {
      history.push(`${history.location.pathname}/meal-plan`)
    } else {
      setEditMealPlan(name)
    }
  }

  const handleWorkout = (name: string) => {
    if (isMobile) {
      history.push(`${history.location.pathname}/training-plan`)
    } else {
      setEditWorkout(name)
    }
  }

  const address =
    getRoute(Routes.ACTIVITIES_TS, { clientId: clientId }) +
    (data ? '/ts_1' : '')
  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          <ActivitiesClient
            viewActivity={false}
            clientId={clientId}
            onClientSwitch={(id) => {
              if (!!params.id || !!params.revisionId) {
                const pathes = history.location.pathname.split('/')
                if (pathes[pathes.length - 1] === 'edit') {
                  history.push(
                    getRoute(Routes.ACTIVITIES_TS_EDIT, {
                      clientId: id,
                      id: params.id,
                      revisionId: params.revisionId
                    })
                  )
                } else {
                  history.push(
                    getRoute(Routes.ACTIVITIES_TS_ID, {
                      clientId: id,
                      id: params.id,
                      revisionId: params.revisionId
                    })
                  )
                }
              } else {
                history.push(
                  getRoute(Routes.ACTIVITIES_TS_NEW, { clientId: id })
                )
              }
            }}
          />
          <Card className="AddTrainingSplit__card">
            {isMobile || (
              <>
                <MobileBack
                  alias={data ? 'training-split' : 'training-split-overview'}
                  to={address}
                />
                <div className="AddTrainingSplit__title-container">
                  <Title>
                    {revision._id
                      ? 'Editing Training Split'
                      : 'Creating Training Split'}
                  </Title>

                  <Button onClick={() => setShowConfirm(true)}>
                    {revision._id ? 'Save Changes' : 'Create'}
                  </Button>
                </div>

                <div className="AddTrainingSplit__divider" />
              </>
            )}

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
                value={dayCount}
                onChange={(value) => handleDays(value)}
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
                        dayCount,
                        'days'
                      )
                    }
                    value={value}
                    onChange={(e, date) => onChange(name, date)}
                    error={errors.scheduled_start_on}
                  />
                )}
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
                    getLatestRevision(dietPlans.find((dp) => dp._id === value))
                      ?._id
                  )
                }}
                options={dietPlans.map((dp) => ({
                  label: dp.name,
                  value: dp._id
                }))}
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
                    getLatestRevision(
                      trainingPlans.find((tp) => tp._id === value)
                    )?._id
                  )
                }}
                options={trainingPlans.map((tp) => ({
                  label: tp.name,
                  value: tp._id
                }))}
              />
            </div>
          </Card>

          <Card className="AddTrainingSplit__card">
            <div className="AddTrainingSplit__cards-title-container">
              <Subtitle className="AddTrainingSplit__cards-title">
                {data ? 'Edit your split' : 'Build your split'}
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
                tpDays={tpRev.days}
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
                      tpDays={tpRev.days}
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

                <div className="AddTrainingSplit__cards-checkbox-container">
                  <Checkbox className="AddTrainingSplit__cards-checkbox" />
                  <Label className="AddTrainingSplit__cards-checkbox-label">
                    Save as re-usable template
                  </Label>
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

      {/* make changes */}
      <ConfirmDialog
        actions={{
          yes: 'Looks good, save it',
          cancel: 'Cancel',
          onYes: () => {
            setShowConfirm(false)
            handleSave()
          },
          onCancel: () => setShowConfirm(false),
          layout: 'between'
        }}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        name="Make Change Training Split"
        description="You’re about to making changes to the following training split:"
        title="Training Split Created on Nov 11"
        date={{
          label: 'From when should we apply this change',
          value: ''
        }}
        alertTitle="Read this before make change!"
        alert={
          <ul>
            <li>
              A new revision of your training plan will be created. You can, at
              all times, go back to old revisions, such as the one you just
              edited, and re-activate it.
            </li>
            <li>
              Any changes you made to training and diet plans will be applied to
              respective meal/training plans. A new revision will be created.
            </li>
            <li>
              The version you just edited will become active and applied to any
              future dates on your calendar.
            </li>
          </ul>
        }
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title={data ? 'Editing Training Split' : 'Creating Training Split'}
      headerTopComponent={
        <HeaderLink to={getRoute(Routes.ACTIVITIES_TS, { clientId: clientId })}>
          Back to Split Overview
        </HeaderLink>
      }
      actionComponent={
        <Button onClick={() => setShowConfirm(true)}>Save</Button>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
