import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './exercise-accrdion.styles'

interface ExerciseAccordionProps {
  name: string
  onRemove: any
  borderBottom?: boolean
  prefix?: boolean
  dragHandleProps: any
  innerRef?: any
  draggableProps: any
  isDragging: boolean
}

export default function ExerciseAccordion({
  dragHandleProps,
  innerRef,
  draggableProps,
  name,
  onRemove,
  borderBottom,
  prefix
}: ExerciseAccordionProps) {
  const methods = useFormContext()
  const exerciseName = methods.getValues(`${name}.name`)
  const isCardio = methods.getValues(`${name}.info.cardio`)

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  return (
    <div ref={innerRef} {...draggableProps}>
      <SubItemAccordion
        dragHandleProps={dragHandleProps}
        prefix={
          prefix ? <WorkoutSubtitle>Exercises</WorkoutSubtitle> : undefined
        }
        borderBottom={borderBottom}
        title={exerciseName}
        onRemove={onRemove}
        content={
          <Styles>
            <Controller
              name={`${name}.name`}
              render={({ field: { name, value } }) => (
                <Input
                  id="Exercise-name"
                  label={isCardio ? 'Cardio name' : 'Exercise name'}
                  placeholder="1A--"
                  value={value}
                  onChange={(e) => onChange(name, e.target.value)}
                  className="ExerciseAccordion__name"
                  error={get(errors, name)}
                  ErrorProps={{ size: 'sm' }}
                />
              )}
            />

            {isCardio ? (
              <>
                <Controller
                  name={`${name}.info.duration`}
                  render={({ field: { name, value } }) => (
                    <TimePicker
                      id="cardio-duration"
                      label="Duration"
                      placeholder="00:30"
                      value={value}
                      onChange={(e, date) => {
                        methods.setValue(name, date)
                      }}
                      error={get(errors, name)}
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
              </>
            ) : (
              <>
                <div className="ExerciseAccordion__controls">
                  <Controller
                    name={`${name}.info.sets`}
                    render={({ field: { name, value } }) => (
                      <Input
                        id="Exercise-sets"
                        label="Sets"
                        placeholder="10"
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
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
                        placeholder="10"
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        error={get(errors, name)}
                        ErrorProps={{ size: 'sm' }}
                      />
                    )}
                  />
                  <Controller
                    name={`${name}.info.rest_interval`}
                    render={({ field: { name, value } }) => (
                      <Input
                        id="Exercise-rest-interval"
                        label="Rest Interval"
                        placeholder="10"
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                        error={get(errors, name)}
                        ErrorProps={{ size: 'sm' }}
                      />
                    )}
                  />
                </div>

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
          </Styles>
        }
      />
    </div>
  )
}
