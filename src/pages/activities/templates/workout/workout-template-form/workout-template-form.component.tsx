import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch
} from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'

import { AddIcon } from '../../../../../assets/media/icons'
import { WorkoutIcon } from '../../../../../assets/media/icons/activities'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Error from '../../../../../components/form/error/error.component'
import { EmptyPlaceholder } from '../../../../../components/placeholders'
import useTemplateWorkout from '../../../../../hooks/api/templates/workouts/useTemplateWorkout'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import Exercise from '../../../components/workout-day-accordion/components/exercise/exercise.component'
import ExerciseAccordion from '../../../components/workout-day-accordion/components/exercise-accordion/exercise-accordion.component'
import Superset from '../../../components/workout-day-accordion/components/superset/superset.component'
import SupersetAccordion from '../../../components/workout-day-accordion/components/superset-accordion/superset-accordion.component'
import Styles, { WorkoutStyles } from './workout-template-form.styles'

interface IProps {
  onClose: () => void
}

const defaultValues = {
  name: '',
  time: '',
  items: []
}

const validationSchema = yup.object().shape({
  name: yup.string(),
  time: yup.string().nullable()
})

function createExercise(isSuperset: boolean | number, cardio: boolean) {
  const ex = cardio
    ? {
        name: '',
        info: {
          cardio: true,
          duration: '00:10',
          intensity: 'Moderate'
        }
      }
    : {
        name: isSuperset ? `${isSuperset}A--` : '',
        link: '',
        info: {
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        },
        sort_order: isSuperset && 1
      }
  return {
    is_superset: isSuperset && true,
    save_as_template: false,
    data: isSuperset ? [ex] : ex
  }
}

export default function WorkoutTemplateForm({ onClose }: IProps) {
  const [dropId] = useState(Date.now())
  const isMobile = useIsMobile()

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange'
  })

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `items`
  })

  const workoutName = useWatch({
    name: `name`,
    control: methods.control
  })

  const { id } = useParams<any>()
  const { workout, onEdit } = useTemplateWorkout(id)

  useEffect(() => {
    if (workout._id) {
      methods.setValue('name', workout.name)
      exercisesArray.remove(
        Array(exercisesArray.fields.length)
          .fill(1)
          .map((v, i) => i)
      )
      exercisesArray.append(workout.items)
    }
  }, [workout._id])

  const { errors } = methods.formState

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const handleExerciseAdd = (isSuperset: boolean | number, cardio = false) => {
    exercisesArray.append(createExercise(isSuperset, cardio))
    methods.clearErrors(`items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  const supersetIndexes = exercisesArray.fields
    .map((row: any, index) => (row.is_superset ? index : null))
    .filter((row) => row !== null)

  const SupersetComponent = isMobile ? SupersetAccordion : Superset
  const ExerciseComponent = isMobile ? ExerciseAccordion : Exercise

  const content = (
    <FormProvider {...methods}>
      <WorkoutStyles>
        <div className="Workout__header">
          <div className="Workout__header-title">
            <div className="Workout__header-icon">
              <WorkoutIcon />
            </div>
            <div className="subtitle">
              {workoutName || workout.name || 'Workout'}
            </div>
          </div>

          <div className="Workout__header-checkbox-cell">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <div className="Workout__title">
          <Controller
            name={`name`}
            render={({ field: { value, name } }) => (
              <AutoCompleteInput
                id="Workout-title"
                label="Workout Name"
                placeholder="Workout Name"
                value={value === '' ? null : value}
                onChange={(value) => methods.setValue(name, value)}
                options={[]}
              />
            )}
          />
        </div>

        <div className="Workout__exercises">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`droppable-${dropId}`}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {!exercisesArray.fields.length ? (
                    <div>
                      <EmptyPlaceholder text="Add your exercises" spacing />
                    </div>
                  ) : (
                    <>
                      {exercisesArray.fields.map((row: any, index) => (
                        <Draggable
                          key={row.id}
                          draggableId={`${row.id}`}
                          isDragDisabled={row.is_superset}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            row.is_superset ? (
                              <SupersetComponent
                                key={row.id}
                                name={`items.${index}`}
                                dragHandleProps={provided.dragHandleProps}
                                draggableProps={provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                innerRef={provided.innerRef}
                                onRemove={() => handleExerciseRemove(index)}
                                labelIndex={supersetIndexes.indexOf(index) + 1}
                              />
                            ) : (
                              <ExerciseComponent
                                key={row.id}
                                dragHandleProps={provided.dragHandleProps}
                                draggableProps={provided.draggableProps}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                name={`items.${index}.data`}
                                onRemove={() => handleExerciseRemove(index)}
                                prefix={
                                  index === 0 ||
                                  !!(exercisesArray.fields as any)[index - 1]
                                    ?.is_superset
                                }
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
            onClick={() => handleExerciseAdd(false)}
          >
            <AddIcon />
            Add Exercise
          </Button>

          <Button
            variant="text"
            size="sm"
            className="Workout__action-btn"
            onClick={() => handleExerciseAdd(supersetIndexes.length + 1)}
          >
            <AddIcon />
            Add Superset
          </Button>

          <Button
            variant="text"
            size="sm"
            className="Workout__action-btn"
            onClick={() => handleExerciseAdd(false, true)}
          >
            <AddIcon />
            Add Cardio
          </Button>
        </div>

        {typeof get(errors, `items`) === 'object' &&
          !Array.isArray(get(errors, `items`)) && (
            <Error standalone="Add at least one exercise" />
          )}
      </WorkoutStyles>
    </FormProvider>
  )

  return isMobile ? (
    <MobilePage
      title="Editing Workout Template"
      headerTopComponent={
        <HeaderLink onClick={onClose}>Go Back to Overview</HeaderLink>
      }
    >
      <Styles>{content}</Styles>
    </MobilePage>
  ) : (
    <Styles>
      <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
      <h1 className="Title">Edit Workout Template</h1>
      {content}
    </Styles>
  )
}
