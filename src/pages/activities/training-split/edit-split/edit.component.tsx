import moment, { Moment } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch
} from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import Select from '../../../../components/form/select/select.component'
import { Subtitle, Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useDietPlan from '../../../../hooks/api/activities/useDietPlan'
import useDietPlans from '../../../../hooks/api/activities/useDietPlans'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import useTrainingPlans from '../../../../hooks/api/activities/useTrainingPlans'
import useTrainingSplit from '../../../../hooks/api/activities/useTrainingSplit'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
import useTemplateWorkouts from '../../../../hooks/api/templates/workouts/useTemplateWorkouts'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import useFormLock from '../../../../hooks/ui/useTrainingPlanFormLock'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getActiveOrLatestRev } from '../../../../utils/api/activities'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import Counter from '../../components/counter/counter.component'
import DayTrainingSplitEditCard from '../../components/day-training-split-edit-card/day-training-split-edit-card.component'
import ConfirmDialog from '../../components/dialog/confirm-dialog/confirm-dialog.component'
import MealPlanEditDialog from '../../components/edit-dialog/mealplan/mealplanday-edit-dialog.component'
import WorkoutEditDialog from '../../components/edit-dialog/workoutday/workoutday-edit-dialog.component'
import { ConfirmModal } from '../../training-plan/components/confimation-modal/confirmation-modal.component'
import { Styles } from './edit-split.styles'

const defaultValues: any = {
  name: '',
  save_as_template: false,
  training_plan_revision_id: '',
  diet_plan_revision_id: '',
  account_id: null,
  scheduled_start_on: '',
  scheduled_end_on: '',
  days: []
}

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

export default function EditTrainingSplit() {
  const history = useHistory()
  const params = useParams<any>()
  const { clientId } = params
  const isMobile = useIsMobile()
  const { type: userType } = useAuth()
  // const [dayView, setDayView] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [editMealPlan, setEditMealPlan] = useState('')
  const [editWorkout, setEditWorkout] = useState('')
  const [selectedTP, setSelectedTP] = useState<{ id: string; revId: string }>({
    id: '',
    revId: ''
  })
  const [selectedDP, setSelectedDP] = useState<{ id: string; revId: string }>({
    id: '',
    revId: ''
  })
  const [redirectTo, setRedirectTo] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)

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
    id: selectedTP.id,
    revisionId: selectedTP.revId
  })

  const { revision: dpRev } = useDietPlan({
    id: selectedDP.id,
    revisionId: selectedDP.revId
  })

  const { trainingSplit, revision, onAdd, onEdit } = useTrainingSplit({
    clientId,
    id: params.id,
    revisionId: params.revisionId
  })

  const { workouts: templateWorkouts } = useTemplateWorkouts({ clientId })
  const { mealPlans: templateMealPlans } = useTemplateMealPlans({ clientId })

  const [scheduled_start_on, name] = useWatch({
    control: methods.control,
    name: ['scheduled_start_on', 'name']
  })

  const { onUnlock } = useFormLock(
    methods.control,
    () => setOpenConfirm(true),
    setRedirectTo
  )

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
  const diff = moment(endDate).diff(startDate, 'days')

  startDate.setDate(startDate.getDate() - 1)

  useEffect(() => {
    if (revision._id) {
      methods.setValue('account_id', trainingSplit.account_id)
      methods.setValue(
        'training_plan_revision_id',
        revision.training_plan_revision_id
      )
      methods.setValue('diet_plan_revision_id', revision.diet_plan_revision_id)
      methods.setValue('scheduled_start_on', revision.scheduled_start_on)
      methods.setValue('scheduled_end_on', revision.scheduled_end_on)
      daysArray.remove(
        Array(daysArray.fields.length)
          .fill(1)
          .reduce((acc, v, i) => [...acc, i], [])
      )
      daysArray.append(revision.days)
      setSelectedTP({
        id: revision.training_plan?._id || '',
        revId: revision.training_plan_revision_id || ''
      })
      setSelectedDP({
        id: revision.diet_plan?._id || '',
        revId: revision.diet_plan_revision_id || ''
      })
    }

    if (trainingSplit._id) {
      methods.setValue('name', trainingSplit.name)
    }
  }, [revision._id, trainingSplit._id])

  const handleSubmit = (values: any) => {
    console.log('values', values)
    if (trainingSplit._id && revision._id) {
      onEdit(trainingSplit._id, revision._id, values, () => {
        onUnlock()
        redirectTo && history.push(redirectTo)
      })
    } else {
      onAdd(values, () => {
        onUnlock()
        redirectTo && history.push(redirectTo)
      })
    }
  }

  const handleSave = () => {
    if (revision._id) {
      setShowConfirm(true)
      return
    }
    methods.handleSubmit(handleSubmit)()
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

  const onTPChange = (value: string) => {
    const revId =
      getActiveOrLatestRev(trainingPlans.find((tp) => tp._id === value))?._id ||
      ''
    setSelectedTP({
      id: value,
      revId
    })
    methods.setValue('training_plan_revision_id', revId)
  }

  const onDPChange = (value: string) => {
    const revId =
      getActiveOrLatestRev(dietPlans.find((dp) => dp._id === value))?._id || ''
    setSelectedDP({
      id: value,
      revId
    })
    methods.setValue('diet_plan_revision_id', revId)
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

  const tpWorkout = useMemo(() => {
    return [
      ...(tpRev.activities || []),
      ...templateWorkouts.map((tw) => ({ ...tw, fromTemplate: true }))
    ].filter((w) => !!w)
  }, [tpRev._id, templateWorkouts])

  const dpMeals = useMemo(() => {
    return [
      ...(dpRev.days || []),
      ...templateMealPlans.map((tw) => ({ ...tw, fromTemplate: true }))
    ].filter((m) => !!m)
  }, [dpRev._id, templateMealPlans])

  const onClose = () => {
    const address = !revision._id
      ? getRoute(Routes.ACTIVITIES_TS, { clientId: clientId })
      : getRoute(Routes.ACTIVITIES_TS_ID, {
          clientId: clientId,
          id: params.id,
          revisionId: params.revisionId
        })
    history.push(address)
  }

  const onGoBack = () => {
    if (methods.formState.isDirty) {
      setOpenConfirm(true)
    } else {
      onClose()
    }
  }

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          {userType !== userTypes.CLIENT && (
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
          )}

          <Card className="AddTrainingSplit__card">
            {isMobile || (
              <>
                <GoBack onClick={onGoBack}>
                  {revision._id ? 'Back to Split Overview' : 'Back to Splits'}
                </GoBack>
                <div className="AddTrainingSplit__title-container">
                  <Title>
                    {revision._id
                      ? 'Editing Training Split'
                      : 'Creating Training Split'}
                  </Title>

                  <Button onClick={handleSave}>
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
                disableInputChange
                maxValue={diff}
                value={daysArray.fields.length}
                onChange={() => {}}
                onIncrease={() => handleDayAdd()}
                onDecrease={() => handleDayRemove(daysArray.fields.length - 1)}
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
                    onChange={(e, date) => {
                      onChange(name, date)
                      console.log(e, date)
                    }}
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
          </Card>

          <Card className="AddTrainingSplit__card">
            <div className="AddTrainingSplit__cards-title-container">
              <Subtitle className="AddTrainingSplit__cards-title">
                {revision._id ? 'Edit your split' : 'Build your split'}
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
                tpActivities={tpRev.activities}
                maxDays={daysArray.fields.length}
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
                  day={`Day ${i + 1}`}
                  edit
                  onWorkout={handleWorkout}
                  onMealPlan={handleMealPlan}
                  onCardio={() => {}}
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

          <ConfirmModal
            onExitWithoutSave={() => {
              onClose()
              redirectTo && history.push(redirectTo)
            }}
            onRedirectTo={setRedirectTo}
            onUnlock={onUnlock}
            onSave={handleSave}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
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
            methods.handleSubmit(handleSubmit)()
          },
          onCancel: () => setShowConfirm(false),
          layout: 'between'
        }}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        name="Make Change Training Split"
        description="You’re about to making changes to the following training split:"
        title={name}
        date={{
          label: 'From when should we apply this change',
          value: scheduled_start_on,
          disabledDate: (date: Moment) => date.isBefore(),
          onChange: (e: any, date: any) => {
            methods.setValue('scheduled_start_on', date)
          }
        }}
        alertTitle="Read this before make change!"
        alert={
          <ul>
            <li>
              A new revision of your training split will be created. You can, at
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
      title={
        revision._id ? 'Editing Training Split' : 'Creating Training Split'
      }
      headerSpacing={20}
      headerTopComponent={
        <HeaderLink onClick={onGoBack}>
          {revision._id ? 'Back to Split Overview' : 'Back to Splits'}
        </HeaderLink>
      }
      actionComponent={<Button onClick={handleSave}>Save</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
