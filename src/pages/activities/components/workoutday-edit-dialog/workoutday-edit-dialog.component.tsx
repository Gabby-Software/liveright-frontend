import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { AddIcon } from '../../../../assets/media/icons'
import { ReactComponent as CloseIcon } from '../../../../assets/media/icons/times.svg'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import Input from '../../../../components/form/input/input.component'
import Workout from '../workout-day-accordion/components/workout/workout.component'
import { Styles } from './workoutday-edit-dialog.styles'

interface WorkoutDayEditDialogProps {
  data: any
  open: boolean
  onClose?: () => void
}
const WorkoutDayEditDialog = (props: WorkoutDayEditDialogProps) => {
  const { data, ...others } = props

  const initValues = ((data: any) => {
    if (!data) return {}

    const result: any = { name: data.name }
    for (const workout of data.activities) {
      result[`${workout.name}.name`] = workout.name
      result[`${workout.name}.items`] = workout.items.map(
        (item: any, idx: number) => ({
          id: idx,
          type: item.length === 1 ? 'exercise' : 'superset',
          data: item.length === 1 ? item[0] : item
        })
      )
      workout.items.forEach((item: any, idx: number) => {
        if (item.length === 1) {
          result[`${workout.name}.items.${idx}.name`] = item[0].name
          result[`${workout.name}.items.${idx}.info.steps`] = item[0].info.steps
          result[`${workout.name}.items.${idx}.info.reps`] = item[0].info.reps
          result[`${workout.name}.items.${idx}.info.tempo`] = item[0].info.tempo
          result[`${workout.name}.items.${idx}.info.rest_interval`] =
            item[0].info.rest_interval
        } else {
          item.forEach((ex: any, i: number) => {
            result[`${workout.name}.items.${idx}.${i}.name`] = item[0].name
            result[`${workout.name}.items.${idx}.${i}.info.steps`] =
              item[0].info.steps
            result[`${workout.name}.items.${idx}.${i}.info.reps`] =
              item[0].info.reps
            result[`${workout.name}.items.${idx}.${i}.info.tempo`] =
              item[0].info.tempo
            result[`${workout.name}.items.${idx}.${i}.info.rest_interval`] =
              item[0].info.rest_interval
          })
        }
      })
    }

    return result
  })(data)

  const methods = useForm({
    defaultValues: initValues
  })

  const onNew = () => {}

  const workouts = data?.activities

  return (
    <Dialog title="Edit Training Plan Day" extended {...others}>
      <Styles>
        <FormProvider {...methods}>
          <section className="WorkoutDayEdit__block">
            <Controller
              name="name"
              render={({ field: { value, name } }) => (
                <Input
                  id="add-training-plan-name"
                  label="Training Plan Day Name"
                  placeholder="Name"
                  className="EditPlan__input"
                  value={value}
                  onChange={(e: any) => methods.setValue(name, e.target.value)}
                />
              )}
            />

            <div className="WorkoutDayEdit__days">
              <p className="subtitle">Currently used on</p>
              <div className="WorkoutDayEdit__days-container">
                <DeletableDay name="Day 1" />
                <DeletableDay name="Day 3" />
              </div>
            </div>
          </section>

          <section className="WorkoutDayEdit__block">
            <p className="subtitle">List workouts of this training plan</p>

            <div className="WorkoutDayEdit__workouts">
              {workouts &&
                workouts.map((workout: any, idx: number) => (
                  <Workout
                    key={workout.id}
                    name={workout.name}
                    onRemove={() => {}}
                    index={idx}
                    data={workout}
                  />
                ))}
            </div>

            <div className="WorkoutDayEdit__add" onClick={onNew}>
              <AddIcon />
              Add Another Workout
            </div>

            <div className="WorkoutDayEdit__actions">
              <Button onClick={props.onClose}>
                Save and apply to all days
              </Button>
            </div>
          </section>
        </FormProvider>
      </Styles>
    </Dialog>
  )
}

export default WorkoutDayEditDialog

interface DeletableDayProps {
  name: string
  onDelete?: (id: string) => void
}

function DeletableDay(props: DeletableDayProps) {
  const { name, onDelete } = props
  return (
    <div className="day-item">
      <span>{name}</span>
      <IconButton onClick={onDelete ? () => onDelete('') : undefined}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
