import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import Workout from '../../workout-day-accordion/components/workout/workout.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/edit-dialog.styles'

interface WorkoutDayEditProps {
  data: any
}
const WorkoutDayEdit = ({ data }: WorkoutDayEditProps) => {
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
            result[`${workout.name}.items.${idx}.data.${i}.name`] = ex.name
            result[`${workout.name}.items.${idx}.data.${i}.info.steps`] =
              ex.info.steps
            result[`${workout.name}.items.${idx}.data.${i}.info.reps`] = ex.info.reps
            result[`${workout.name}.items.${idx}.data.${i}.info.tempo`] =
              ex.info.tempo
            result[`${workout.name}.items.${idx}.data.${i}.info.rest_interval`] =
              ex.info.rest_interval
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
  const onClose = () => {}

  const workouts = data?.activities
  return (
    <Styles>
      <FormProvider {...methods}>
        <section className="EditDialog__block">
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

          <div className="EditDialog__days">
            <p className="subtitle">Currently used on</p>
            <div className="EditDialog__days-container">
              <DeletableDay name="Day 1" />
              <DeletableDay name="Day 3" />
            </div>
          </div>
        </section>

        <section className="EditDialog__block">
          <p className="subtitle">List workouts of this training plan</p>

          <div className="EditDialog__workouts">
            {workouts &&
              workouts.map((workout: any, idx: number) => (
                <Workout
                  key={idx}
                  name={workout.name}
                  onRemove={() => {}}
                  index={idx}
                  data={workout}
                />
              ))}
          </div>

          <div className="EditDialog__add" onClick={onNew}>
            <AddIcon />
            Add Another Workout
          </div>

          <div className="EditDialog__actions">
            <Button onClick={onClose}>Save and apply to all days</Button>
          </div>
        </section>
      </FormProvider>
    </Styles>
  )
}

export default WorkoutDayEdit
