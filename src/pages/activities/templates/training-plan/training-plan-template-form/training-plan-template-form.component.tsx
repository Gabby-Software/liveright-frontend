import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormState
} from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import Card from '../../../../../components/cards/card/card.component'
import Error from '../../../../../components/form/error/error.component'
import Input from '../../../../../components/form/input/input.component'
import { Title } from '../../../../../components/typography'
import useTemplateTrainingPlan from '../../../../../hooks/api/templates/training-plans/useTemplateTrainingPlan'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import ActivitiesDialog from '../../../components/dialog/activities-dialog.component'
import WorkoutDayAccordion from '../../../components/workout-day-accordion/workout-day-accordion.component'
import { Styles } from '../../../styles/edit-plan.styles'

interface TrainingPlanTemplateFormProps {
  onClose: () => void
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  scheduled_start_on: yup.string().nullable(),
  days: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      activities: yup.array().of(
        yup.object().shape({
          name: yup.string(),
          time: yup.string().nullable(),
          items: yup.array()
        })
      )
    })
  )
})

const defaultValues: any = {
  name: '',
  days: []
}

function createDay(dayIndex: number) {
  return {
    name: `Workout day ${dayIndex}`,
    save_as_template: false,
    activities: []
  }
}

function updateDay(name: string, activities: Array<any>) {
  return {
    name,
    activities
  }
}

export default function TrainingPlanTemplateForm({
  onClose
}: TrainingPlanTemplateFormProps) {
  const [dayIndex, setDayIndex] = useState(0)
  const [delIdx, setDelIdx] = useState(-1)

  const isMobile = useIsMobile()

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const { errors } = useFormState({
    control: methods.control
  })

  const daysArray = useFieldArray({
    control: methods.control,
    name: 'days'
  })

  const activitiesArray = useFieldArray({
    control: methods.control,
    name: 'activities'
  })

  const { id } = useParams<any>()
  const { trainingPlan, onEdit } = useTemplateTrainingPlan(id)

  useEffect(() => {
    if (trainingPlan._id) {
      methods.setValue('name', trainingPlan.name)
      daysArray.remove(
        Array(daysArray.fields.length)
          .fill(1)
          .map((v, i) => i)
      )
      daysArray.append(trainingPlan.days)
      methods.setValue('activities', trainingPlan.days[0]?.activities)
    }
  }, [trainingPlan._id])

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  const handleDayAdd = () => {
    const newDayIndex = dayIndex + 1
    daysArray.append(createDay(newDayIndex))
    methods.clearErrors('days')
    setDayIndex(newDayIndex)
  }

  const handleDayRemove = (index: number) => {
    setDelIdx(index)
  }

  const removeWorkout = () => {
    daysArray.remove(delIdx)
    setDelIdx(-1)
    setDayIndex(dayIndex - 1)
    methods.clearErrors('days')
  }

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  useEffect(() => {
    const days = methods.getValues('days')
    for (let i = 0; i < days.length; i++) {
      if (days[i]?.activities) {
        if (days[i].name) {
          if (days[i].name.indexOf('Workout day ') < 0) {
            daysArray.update(i, updateDay(days[i].name, days[i]?.activities))
          } else {
            daysArray.update(
              i,
              updateDay(`Workout day ${i + 1}`, days[i]?.activities)
            )
          }
        } else {
          daysArray.update(
            i,
            updateDay(`Workout day ${i + 1}`, days[i]?.activities)
          )
        }
      }
    }
  }, [dayIndex])

  const content = (
    <>
      <FormProvider {...methods}>
        <Styles>
          <Card className="EditPlan__overview">
            {!isMobile && (
              <>
                <GoBack spacing={4} onClick={onClose}>
                  {'Go Back to Overview'}
                </GoBack>

                <div className="EditPlan__header">
                  <Title>{'Edit Training Plan Template'}</Title>

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
                  <Input
                    id="add-training-plan-name"
                    label="Training Plan Name"
                    placeholder="Name"
                    className="EditPlan__input"
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    error={errors.name}
                  />
                )}
              />
            </div>
          </Card>

          {activitiesArray.fields.map((activity, index) => (
            <WorkoutDayAccordion
              key={activity.id}
              index={index}
              defaultOpened={false}
              onRemove={() => handleDayRemove(index)}
            />
          ))}

          <div className="EditPlan__add-new-day" onClick={handleDayAdd}>
            <AddIcon />
            Add Workout
          </div>
          {typeof errors.days === 'object' && !Array.isArray(errors.days) && (
            <Error standalone="Add at least one day" />
          )}
        </Styles>
      </FormProvider>

      <ActivitiesDialog
        open={delIdx >= 0}
        onClose={() => setDelIdx(-1)}
        name="Delete Confirmation"
        title="Are you sure you want to delete the workout day?"
        separator={false}
        body="This will delete the workout day which potentially has workouts"
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
      title={'Edit Training Plan Template'}
      headerSpacing={20}
      headerTopComponent={
        <HeaderLink onClick={onClose}>{'Back to Overview'}</HeaderLink>
      }
      actionComponent={<Button onClick={handleSave}>Save</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
