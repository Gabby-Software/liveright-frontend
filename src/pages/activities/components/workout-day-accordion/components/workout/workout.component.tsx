import { get } from 'lodash'
import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  // Controller,
  useFieldArray,
  useFormContext
  // useWatch
} from 'react-hook-form'

import {
  AddIcon
  // DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
// import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
// import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
// import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Error from '../../../../../../components/form/error/error.component'
// import Label from '../../../../../../components/form/label/label.component'
// import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
// import useTemplateWorkouts from '../../../../../../hooks/api/templates/workouts/useTemplateWorkouts'
// import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
import Exercise from '../exercise/exercise.component'
import Superset from '../superset/superset.component'
import { Styles } from './workout.styles'

interface WorkoutProps {
  name: string
  index: number
  data?: any
  onRemove: any
}

function createExercise(
  exerciseNo: number,
  isSuperset: boolean | number,
  cardio: boolean
) {
  const ex = {
    name: '',
    link: '',
    info: {
      type: cardio ? 'cardio' : 'strength',
      sets: '',
      reps: '',
      tempo: '',
      rest_interval: '',
      duration: '',
      intensity: ''
    },
    sort_order: isSuperset && 1
  }
  return {
    is_superset: isSuperset && true,
    save_as_template: false,
    data: isSuperset ? [ex] : ex
  }
}

export default function Workout({ name }: WorkoutProps) {
  const [dropId] = useState(Date.now())

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}`
  })

  console.log('exercisesArray', exercisesArray)
  // const workoutName = useWatch({
  //   name: `${name}.name`,
  //   control: methods.control
  // })

  // const days = useWatch({
  //   name: `days`,
  //   control: methods.control
  // })

  // const { workouts } = useTemplateWorkouts()

  const { errors } = methods.formState

  const onDragEnd = (result: DropResult) => {
    console.log('result', result)
    if (!result.destination) {
      return
    }

    exercisesArray.swap(result.source.index, (result.destination as any).index)
    // setTimeout(resetPrefixValues, 10)
  }

  const handleExerciseAdd = (
    exerciseNo: number,
    isSuperset: boolean | number,
    cardio = false
  ) => {
    exercisesArray.append(createExercise(exerciseNo, isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
    // wait for removal to finish
    // setTimeout(resetPrefixValues, 10)
  }

  // const resetPrefixValues = () => {
  //   const values: any[] = methods.getValues(name)
  //   // get values and re-order the prefix values i.e 1A, 1B etc.
  //   values.forEach((v, i) => {
  //     if (v.is_superset) {
  //       v.data.forEach((v: any, idx: number) => {
  //         // const suf = String(v.name).split('--')[1]
  //         methods.setValue(
  //           `${name}.${i}.data.${idx}.name`,
  //           // `${i + 1}${String.fromCharCode(65 + idx)}--${suf}`
  //           ''
  //         )
  //       })
  //     } else {
  //       // const suf = String(v.data.name).split('--')[1]
  //       methods.setValue(`${name}.${i}.data.name`, '')
  //     }
  //   })
  // }

  // const onWorkoutNameSelected = (value: string) => {
  //   // find in templates
  //   let workout = workouts.find((w: any) => w.name === value)
  //   if (!workout) {
  //     // else not found, check in current TP
  //     const workoutsOfPlan = days?.reduce(
  //       (acc: any[], d: any) => [
  //         ...acc,
  //         ...(d.activities || d.training_plan_day.activities || [])
  //       ],
  //       []
  //     )
  //     workout = workoutsOfPlan.find((w: any) => w.name === value)
  //   }

  //   if (workout) {
  //     // if you just try to set workout as a whole, exercise fields i.e. exerciseArray would not update.
  //     methods.setValue(`${name}.name`, workout.name)
  //     methods.setValue(`${name}.time`, workout.time)
  //     exercisesArray.remove(
  //       Array(exercisesArray.fields.length)
  //         .fill(0)
  //         .reduce((acc, v, i) => [...acc, i], [])
  //     )
  //     exercisesArray.append(workout.items)
  //   }
  // }

  // const nameOptions = useMemo(() => {
  //   const workoutsOfPlan = days?.reduce(
  //     (acc: any[], d: any) => [
  //       ...acc,
  //       ...(d.activities || d.training_plan_day.activities || [])
  //     ],
  //     []
  //   )
  //   const planOptions = workoutsOfPlan
  //     ?.filter((w: any) => w.name)
  //     ?.map((w: any) => ({
  //       label: w.name,
  //       value: w.name
  //     }))

  //   const templateOptions = workouts.map((w: any) => ({
  //     label: w.name,
  //     value: w.name
  //   }))

  //   const options = []

  //   if (planOptions.length) {
  //     options.push({
  //       label: 'From this Training Plan',
  //       options: getUniqueItemsByProperties(planOptions, ['label'])
  //     })
  //   }

  //   if (templateOptions.length) {
  //     options.push({
  //       label: 'From Templates',
  //       options: getUniqueItemsByProperties(templateOptions, ['label'])
  //     })
  //   }

  //   return options.length ? options : []
  // }, [days])

  return (
    <Styles>
      {/* <div className="Workout__header">
        <div className="subtitle">{workoutName || `Workout ${index + 1}`}</div>

        <div className="Workout__header-checkbox-cell">
          <div className="Workout__header-checkbox-container">
            <Controller
              render={({ field: { value, name } }) => (
                <div className="Workout__checkbox-container">
                  <Checkbox
                    checked={value}
                    onChange={(e) => methods.setValue(name, e.target.checked)}
                  />
                  <Label className="Workout__checkbox">
                    Save Workout as template
                  </Label>
                </div>
              )}
              name={`${name}.save_as_template`}
            />
          </div>
          <IconButton
            size="sm"
            className="Workout__header-checkbox-btn"
            onClick={onRemove}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
      </div> */}

      {/* <div className="Workout__title">
        <Controller
          name={`${name}.name`}
          render={({ field: { value, name } }) => (
            <AutoCompleteInput
              id="Workout-title"
              label="Title of workout"
              placeholder="Title"
              value={value === '' ? null : value}
              onChange={(value) => methods.setValue(name, value)}
              onSelect={onWorkoutNameSelected}
              options={nameOptions}
            />
          )}
        />
      </div> */}

      {/* <div className="Workout__schedule-container">
        <Controller
          name={`${name}.time`}
          render={({ field: { name, value } }) => (
            <TimePicker
              id="Workout-time"
              label="Schedule"
              placeholder="08:00"
              value={value}
              minuteStep={15}
              onChange={(e, date) => {
                methods.setValue(name, date)
              }}
            />
          )}
        /> */}

      {/* <Select
          disabled
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        /> */}
      {/* </div> */}

      <div className="Workout__exercises">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable-${dropId}`} type="Exercise">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {!exercisesArray.fields.length ? (
                  <div
                    className="Workout__exercises__addExercise"
                    onClick={() =>
                      handleExerciseAdd(exercisesArray.fields.length + 1, false)
                    }
                  >
                    <EmptyPlaceholder text="Add your exercises" spacing />
                  </div>
                ) : (
                  <>
                    {exercisesArray.fields.map((row: any, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={`${row.id}`}
                        // isDragDisabled={row.is_superset}
                        index={index}
                      >
                        {(provided, snapshot) =>
                          row.is_superset ? (
                            <Superset
                              key={row.id}
                              name={`${name}.${index}`}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              isDragging={snapshot.isDragging}
                              innerRef={provided.innerRef}
                              onRemove={() => handleExerciseRemove(index)}
                              labelIndex={index + 1}
                            />
                          ) : (
                            <Exercise
                              key={row.id}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              innerRef={provided.innerRef}
                              isDragging={snapshot.isDragging}
                              name={`${name}.${index}.data`}
                              onRemove={() => handleExerciseRemove(index)}
                              prefix={
                                index === 0 ||
                                !!(exercisesArray.fields as any)[index - 1]
                                  ?.is_superset
                              }
                              labelIndex={index + 1}
                            />
                          )
                        }
                      </Draggable>
                    ))}
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="Workout__actions">
        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, false)
          }
        >
          <AddIcon />
          Add Exercise
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, true)
          }
        >
          <AddIcon />
          Add Superset
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, false, true)
          }
        >
          <AddIcon />
          Add Cardio
        </Button>
      </div>

      {typeof get(errors, `${name}.items`) === 'object' &&
        !Array.isArray(get(errors, `${name}.items`)) && (
          <Error standalone="Add at least one exercise" />
        )}
    </Styles>
  )
}
