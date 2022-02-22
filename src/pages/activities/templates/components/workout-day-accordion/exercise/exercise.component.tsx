import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
// import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import TimeInput from '../../../../../../components/form/TimeInput/time-input.component'
import formatter from '../../../../../../managers/formatter.manager'
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
  labelIndex,
  supersetPrefix = ''
}: ExerciseProps) {
  const methods = useFormContext()

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState
  const isCardio = methods.getValues(`${name}.info.type`) === 'cardio'

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
              <AutoCompleteInput
                id="Exercise-name"
                label={`${isCardio ? 'Cardio' : 'Exercise'} name`}
                placeholder={isCardio ? 'Cardio' : 'Exercise'}
                value={value}
                onChange={(value) => onChange(name, value)}
                options={[]}
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
    </Styles>
  )
}
