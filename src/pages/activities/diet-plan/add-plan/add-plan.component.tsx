import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { Moment } from 'moment'
import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch
} from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import * as yup from 'yup'

import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import GoBack from '../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../components/cards/card/card.component'
import AutoCompleteInput from '../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Error from '../../../../components/form/error/error.component'
// import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import { toast } from '../../../../components/toast/toast.component'
import { Title } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import useDietPlan from '../../../../hooks/api/activities/useDietPlan'
import useTemplateDietPlans from '../../../../hooks/api/templates/diet-plan/useTemplateDietPlans'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { getUniqueItemsByProperties } from '../../../../utils/arrays'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage
} from '../../../../utils/localStorage'
import { getRoute } from '../../../../utils/routes'
import ActivitiesClient from '../../components/activities-client/activities-client.component'
import ActivitiesDialog from '../../components/dialog/activities-dialog.component'
// import MakeChangesDialog from '../../components/dialog/make-changes-dialog/make-changes-dialog.component'
import MealDayAccordion from '../../components/meal-day-accordion/meal-day-accordion.component'
import { Styles } from '../../styles/edit-plan.styles'

interface AddDietPlanProps {
  editDay?: number
  onClose: () => void
  editId?: string
  revisionId?: string
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
  // scheduled_start_on: yup.string().nullable(),
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
                  grams: yup.string().required(),
                  proteins: yup.string().required(),
                  fat: yup.string().required(),
                  net_carbs: yup.string().required()
                })
                // link: yup.lazy((v) =>
                //   !v
                //     ? yup.string().nullable()
                //     : yup
                //     .string()
                //     .matches(URL_REGEX, 'Enter a valid link')
                //     .nullable()
                // ),
                // info: yup.object().shape({
                //   sets: yup.string(),
                //   reps: yup.string(),
                //   tempo: yup.string(),
                //   rest_interval: yup.string()
                // })
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
    name: `Day ${dayIndex}`,
    activities: [],
    save_as_template: false,
    is_day_target: false,
    custom_target: {}
  }
}

// function updateDay(name: string, activities: Array<any>) {
//   return {
//     name,
//     activities
//   }
// }

export default function AddDietPlan({
  editDay,
  onClose,
  editId,
  revisionId
}: AddDietPlanProps) {
  const [dayIndex, setDayIndex] = useState(0)
  // const [makeChangesDialog, setMakeChangesDialog] = useState(false)
  const { clientId } = useParams<any>()
  const queryParams = new URLSearchParams(location.search)
  const history = useHistory()
  const isMobile = useIsMobile()
  const { type: userType } = useAuth()
  const [delIdx, setDelIdx] = useState(-1)
  const [showConfirm, setShowConfirm] = useState(false)

  const { onAdd, onEdit, revision, dietPlan } = useDietPlan({
    clientId,
    id: editId,
    revisionId
  })

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const [name, scheduled_start_on, scheduled_end_on] = useWatch({
    control: methods.control,
    name: ['name', 'scheduled_start_on', 'scheduled_end_on']
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

  const removeWorkout = () => {
    daysArray.remove(delIdx)
    setDelIdx(-1)
    setDayIndex(dayIndex - 1)
  }

  // useEffect(() => {
  //   const days = methods.getValues('days')
  //   for (let i = 0; i < days.length; i++) {
  //     if (days[i]?.activities) {
  //       if (days[i].name) {
  //         if (days[i].name.indexOf('Day ') < 0) {
  //           daysArray.update(i, updateDay(days[i].name, days[i]?.activities))
  //         } else {
  //           daysArray.update(i, updateDay(`Day ${i + 1}`, days[i]?.activities))
  //         }
  //       } else {
  //         daysArray.update(i, updateDay(`Day ${i + 1}`, days[i]?.activities))
  //       }
  //     }
  //   }
  // }, [dayIndex])

  useEffect(() => {
    if (revision._id) {
      methods.setValue('name', dietPlan.name)
      methods.setValue('account_id', revision.account_id)
      methods.setValue('scheduled_start_on', revision.scheduled_start_on)
      methods.setValue('scheduled_end_on', revision.scheduled_end_on)
      /**
       * This is to prevent overwriting days loaded from local storage
       * if days were loaded from local storage. Please read below comment
       * for more information regarding this.
       */
      if (!queryParams.get('loadDaysFromls')) {
        methods.setValue('days', revision.days)
      }
    }
  }, [revision._id])

  /**
   * this is to load days data from local storage which is set when
   * a user tries to apply a meal plan template from template meal
   * plan page. The data is stored in local storage and key is sent using
   * query params. This ways we also know when to acutally load data
   * from local storage.
   */
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

  const handleSubmit = (values: any) => {
    if (editId && revisionId) {
      onEdit(editId, revisionId, values, onClose)
    } else {
      onAdd(values, clientId ?? '', onClose)
    }
  }

  const handleError = () => {
    toast.show({
      type: 'error',
      msg: 'Please fill out all the required fields'
    })
  }

  const handleSave = async () => {
    const valid = await methods.trigger()
    if (scheduled_start_on && scheduled_end_on) {
      const diffTime =
        new Date(String(scheduled_end_on)).getTime() -
        new Date(String(scheduled_start_on)).getTime()
      if (diffTime < 0) {
        methods.setError('scheduled_start_on', {
          type: 'manual',
          message: ''
        })
        methods.setError('scheduled_end_on', {
          type: 'manual',
          message: ''
        })
        toast.show({
          type: 'error',
          msg: 'Start date cannot be earlier than End date'
        })
        return
      }
    }
    if (!valid) {
      toast.show({
        type: 'error',
        msg: 'Please fill out all the required fields'
      })
      return
    }
    if (editId) {
      setShowConfirm(true)
    } else {
      methods.handleSubmit(handleSubmit, handleError)()
    }
  }

  const handleDayAdd = () => {
    const newDayIndex = dayIndex + 1
    daysArray.append(createDay(newDayIndex || 1))
    methods.clearErrors('days')
    setDayIndex(newDayIndex)
  }

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  const { dietTemplates } = useTemplateDietPlans()

  const dietPlanName = useWatch({
    control: methods.control,
    name: 'name'
  })

  const onDietPlanNameSelect = (value: string) => {
    console.log('onDietPlanNameSelect', value)
  }

  const nameOptions = useMemo(() => {
    const templateOptions = dietTemplates
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(dietPlanName?.toLowerCase()) &&
          w?.name !== dietPlanName
      )
      .map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const options = []

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [dietTemplates, dietPlanName])

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          {userType !== userTypes.CLIENT && (
            <ActivitiesClient
              clientId={clientId}
              viewActivity={false}
              preventClientSwitch={Boolean(editId)}
              onClientSwitch={(id) => {
                history.push(
                  getRoute(
                    editId ? Routes.ACTIVITIES_DP_ID : Routes.ACTIVITIES_DP,
                    { clientId: id, id: editId, revisionId: revisionId }
                  )
                )
              }}
            />
          )}

          <Card className="EditPlan__overview">
            {!isMobile && (
              <>
                <GoBack spacing={4} onClick={onClose}>
                  Go back to Overview
                </GoBack>

                <div className="EditPlan__header">
                  <Title>Add Diet Plan</Title>

                  <div>
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                </div>
              </>
            )}

            <div className="EditPlan__controls">
              <Controller
                name="name"
                render={({ field: { value, name } }) => (
                  // <Input
                  //   id="edit-training-plan-name"
                  //   label="Diet Plan name"
                  //   placeholder="Name"
                  //   className={`EditPlan__input ${
                  //     get(errors, name) ? 'invalid-field' : ''
                  //   }`}
                  //   value={value}
                  //   onChange={(e) => onChange(name, e.target.value)}
                  //   // error={errors.name}
                  //   shouldScrollTo={get(errors, name)}
                  // />
                  <AutoCompleteInput
                    id="edit-training-plan-name"
                    label="Diet Plan name"
                    placeholder="Name"
                    value={value}
                    className={`EditPlan__input ${
                      get(errors, name) ? 'invalid-field' : ''
                    }`}
                    onChange={(value) => methods.setValue(name, value)}
                    options={nameOptions}
                    onSelect={onDietPlanNameSelect}
                    shouldScrollTo={get(errors, name)}
                  />
                )}
              />

              <Controller
                name="scheduled_start_on"
                render={({ field: { name, value } }) => (
                  <DatePicker
                    id="add-training-plan-start"
                    placeholder="Pick start date"
                    label="Start date"
                    className={`EditPlan__input ${
                      errors.scheduled_start_on ? 'EditPlan__invalid' : ''
                    }`}
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
                    className={`EditPlan__input ${
                      errors.scheduled_end_on ? 'EditPlan__invalid' : ''
                    }`}
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
              />

              <Controller
                render={({ field: { value, name } }) => (
                  <div className="EditPlan__checkbox-container">
                    <Checkbox
                      checked={value}
                      onChange={(e) => methods.setValue(name, e.target.checked)}
                    />
                    <Label className="EditPlan__checkbox">
                      Save Diet Plan as template
                    </Label>
                  </div>
                )}
                name={`save_as_template`}
              />

              {/*<Counter value={count} onChange={(value) => setCount(value)} />*/}
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

      <ActivitiesDialog
        name="Make Change Plan"
        description="You’re about to making changes to the following diet plan:"
        title={name}
        date={{
          label:
            'Please select the date from when you want these changes to be applied:',
          value: scheduled_start_on,
          disabledDate: (date: Moment) => date.isBefore(),
          onChange: (e: any, date: any) => {
            methods.setValue('scheduled_start_on', date)
          }
        }}
        alert={
          <>
            <div style={{ fontWeight: 600, margin: '0.75rem 0' }}>
              Read this before activating plan!
            </div>
            <ul>
              <li>
                A new revision of your diet plan will be created and it will
                become active. All your meal entries on your calender from this
                day will be updated.
              </li>
              <li>
                This will also make changes to your current training split to
                use the changes you just made.
              </li>
            </ul>
          </>
        }
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        actions={{
          yes: 'Looks Good, Save Changes',
          cancel: 'Cancel',
          layout: 'between',
          onYes: () => methods.handleSubmit(handleSubmit, handleError)(),
          onCancel: () => setShowConfirm(false)
        }}
      />
      <ActivitiesDialog
        open={delIdx >= 0}
        onClose={() => setDelIdx(-1)}
        name="Delete Confirmation"
        title="Are you sure you want to delete the meal day?"
        separator={false}
        body="This will delete the workout day which potentially has meals"
        actions={{
          yes: 'Cancel',
          cancel: 'Delete',
          onYes: () => setDelIdx(-1),
          onCancel: () => removeWorkout()
        }}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Add Diet Plan"
      headerSpacing={20}
      headerTopComponent={
        <HeaderLink onClick={onClose}>
          {revision._id ? 'Go back to Overview' : 'Go back to Diet Plan'}
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
