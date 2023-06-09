import { get } from 'lodash'
import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
// import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import TimeInput from '../../../../../../components/form/TimeInput/time-input.component'
import userTypes from '../../../../../../enums/user-types.enum'
import useTrainingPlanExercises from '../../../../../../hooks/api/activities/useTrainingPlanExercises'
import useTemplateExercises from '../../../../../../hooks/api/templates/useTemplateExercises'
import { useAuth } from '../../../../../../hooks/auth.hook'
import formatter from '../../../../../../managers/formatter.manager'
import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './exercise.styles'

interface ExerciseProps {
  dragHandleProps: any
  isDragging: boolean
  innerRef?: any
  draggableProps: any
  name: string
  onRemove: any
  prefix?: boolean
  fromSuperset?: boolean
  labelIndex?: number
  supersetPrefix?: string
}

export default function Exercise({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  name,
  prefix,
  onRemove,
  fromSuperset,
  labelIndex,
  supersetPrefix = ''
}: ExerciseProps) {
  const params = useParams<any>()
  const { type: userType } = useAuth()
  const methods = useFormContext()

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState
  const isCardio = methods.getValues(`${name}.info.type`) === 'cardio'

  const [fromTemplate] = useWatch({
    control: methods.control,
    name: [`${name}.fromTemplate`]
  })

  // Use these function when implementing exercise template suggestions
  const { exercises } = useTrainingPlanExercises({
    id: params.id,
    revisionId: params.revisionId
  })

  const { exercises: exercisesTemplate } = useTemplateExercises({
    clientId: userTypes.TRAINER === userType ? 'all' : params.clientId
  })

  const onPreviousExerciseSelect = (value: string) => {
    // find in templates
    let ex = exercisesTemplate.find((e: any) => e._id === value)

    if (!ex) {
      // else not found, check in current TP
      ex = exercises.find((e: any) => e.name === value)
    } else {
      // found in template
      methods.setValue(`${name}.fromTemplate`, true)
      methods.setValue(
        `${name.substring(0, name.lastIndexOf('.'))}._id`,
        ex._id
      )
    }

    if (ex) {
      onChange(`${name}.name`, ex?.name)
      onChange(`${name}.info.sets`, ex?.info?.sets)
      onChange(`${name}.info.reps`, ex?.info?.reps)
      onChange(`${name}.info.tempo`, ex?.info?.tempo)
      onChange(`${name}.info.rest_interval`, ex?.info?.rest_interval)
      onChange(`${name}.info.duration`, ex?.info?.duration)
      onChange(`${name}.info.intensity`, ex?.info?.intensity)
      onChange(`${name}.info.avg_heart_rate`, ex?.info?.avg_heart_rate)
      onChange(`${name}.link`, ex?.link ? ex?.link : ex?.info?.link)
    }
  }

  // const renderExersiceAutoComplete = (name: string, value: string) => {
  //     return (
  //       <AutoCompleteInput
  //         id="Exercise-name"
  //         label={`${isCardio ? 'Cardio' : 'Exercise'} name`}
  //         placeholder={isCardio ? 'Cardio' : 'Exercise'}
  //         value={value}
  //         onChange={(value) => {
  //           onChange(name, value)
  //         }}
  //         options={exercises.map((e: any) => ({
  //           label: e.name,
  //           value: e.name
  //         }))}
  //         onSelect={onPreviousExerciseSelect}
  //         error={get(errors, name)}
  //         ErrorProps={{ size: 'sm' }}
  //       />
  //     )
  //   }
  // }

  const exerciseName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const nameOptions = useMemo(() => {
    const exType = methods.getValues(`${name}.info.type`)
    const planOptions = exercises
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(exerciseName?.toLowerCase()) &&
          w.info.type === exType
      )
      ?.map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const templateOptions = exercisesTemplate
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(exerciseName?.toLowerCase()) &&
          w.info.type === exType
      )
      .map((w: any) => ({
        label: w.name,
        value: w._id
      }))

    const options = []

    if (planOptions.length) {
      options.push({
        label: 'From this Training Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [exercises, exercisesTemplate, exerciseName])

  return (
    <Styles
      $isDragging={isDragging}
      $prefix={!!prefix}
      ref={innerRef}
      {...draggableProps}
      cardio={isCardio}
    >
      {prefix && (
        <WorkoutSubtitle className="Exercise__prefix">
          Exercises
        </WorkoutSubtitle>
      )}

      <div className="Exercise__drag">
        <button className="Exercise__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      <Controller
        name={`${name}.name`}
        render={({ field: { name, value } }) => {
          return (
            <div className="exercise-input">
              <p className="exercise-input__prefix">{`${labelIndex}${supersetPrefix}--`}</p>
              {/* <Input
                id="Exercise-name"
                label="Exercise name"
                placeholder="Exersice"
                value={value}
                onChange={(e) => {
                  onChange(name, e.target.value)
                }}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              /> */}
              <AutoCompleteInput
                id="Exercise-name"
                label={`${isCardio ? 'Cardio' : 'Exercise'} name`}
                placeholder={isCardio ? 'Cardio' : 'Exercise'}
                value={value}
                onChange={(value) => onChange(name, value)}
                options={nameOptions}
                onSelect={onPreviousExerciseSelect}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            </div>
          )
        }}
      />

      {isCardio ? (
        <>
          <Controller
            name={`${name}.info.duration`}
            render={({ field: { name, value } }) => (
              // <TimePicker
              //   id="cardio-duration"
              //   label="Duration"
              //   placeholder="00:30"
              //   value={value}
              //   onChange={(e, date) => {
              //     methods.setValue(name, date)
              //   }}
              //   error={get(errors, name)}
              // />
              <TimeInput
                id="cardio-duration"
                label="Duration"
                placeholder="hh:mm"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
                format="HH:mm"
                tooltip="Cardio duration in hours and minutes"
              />
            )}
          />

          <Controller
            name={`${name}.info.intensity`}
            render={({ field: { value, name } }) => (
              <Select
                label="Intensity"
                id="cardio-intensity"
                value={value}
                onChange={(value) => methods.setValue(name, value)}
                options={[
                  { label: 'Relaxed', value: 'Relaxed' },
                  { label: 'Moderate', value: 'Moderate' },
                  { label: 'Intense', value: 'Intense' }
                ]}
              />
            )}
          />

          <Controller
            name={`${name}.info.avg_heart_rate`}
            render={({ field: { value, name } }) => (
              <Input
                id="cardio-avg_heart_rate"
                label="Avg heart rate (bpm)"
                placeholder="90"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                format={formatter().number().min(0).max(999)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
        </>
      ) : (
        <>
          <Controller
            name={`${name}.info.sets`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-sets"
                label="Sets"
                placeholder="10"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                format={formatter().number().min(0).max(100)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
          <Controller
            name={`${name}.info.reps`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-reps"
                label="Reps"
                placeholder="10"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                format={formatter().number().min(0).max(100)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
          <Controller
            name={`${name}.info.tempo`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-tempo"
                label="Tempo"
                placeholder="3021"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                tooltip="Only 4 digits or x allowed."
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
          <Controller
            name={`${name}.info.rest_interval`}
            render={({ field: { name, value } }) => (
              <TimeInput
                id="Exercise-rest-interval"
                label="Rest Interval"
                placeholder="mm:ss"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
                format="mm:ss"
                tooltip="Time duration in minutes and seconds"
              />
            )}
          />
          <Controller
            name={`${name}.link`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-link"
                label="Link to video/instructions"
                placeholder="https://"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                error={get(errors, name)}
                ErrorProps={{ size: 'sm' }}
              />
            )}
          />
        </>
      )}

      <div className="Exercise__delete">
        <IconButton className="Exercise__delete-btn" onClick={onRemove}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>

      {!fromSuperset && (
        <Controller
          render={({ field: { value, name } }) => (
            <div className="Exercise__checkbox-container">
              <Checkbox
                checked={value}
                onChange={(e) => onChange(name, e.target.checked)}
              />
              <Label className="Exercise__checkbox">
                {fromTemplate
                  ? 'Update Training Plan template'
                  : 'Save Training Plan as template'}
              </Label>
            </div>
          )}
          name={`${name}.save_as_template`}
        />
      )}
    </Styles>
  )
}
