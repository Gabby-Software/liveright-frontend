import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import formatter from '../../../../../../managers/formatter.manager'
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
}

export default function Exercise({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  name,
  onRemove,
  fromSuperset
}: ExerciseProps) {
  const methods = useFormContext()

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState
  const isCardio = methods.getValues(`${name}.info.cardio`)

  return (
    <Styles
      $isDragging={isDragging}
      ref={innerRef}
      {...draggableProps}
      cardio={isCardio}
    >
      <div className="Exercise__drag">
        <button className="Exercise__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      <Controller
        name={`${name}.name`}
        render={({ field: { name, value } }) => {
          const [prefix, val] = String(value).split('--')
          return (
            <div className="exercise-input">
              {fromSuperset && (
                <p className="exercise-input__prefix">{prefix}--</p>
              )}
              <Input
                id="Exercise-name"
                label="Exercise name"
                placeholder="Exersice"
                value={fromSuperset ? val : value}
                onChange={(e) => {
                  console.log(
                    fromSuperset
                      ? `${prefix}--${e.target.value}`
                      : e.target.value
                  )
                  onChange(
                    name,
                    fromSuperset
                      ? `${prefix}--${e.target.value}`
                      : e.target.value
                  )
                }}
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
            name={`${name}.info.rest_interval`}
            render={({ field: { name, value } }) => (
              <Input
                id="Exercise-rest-interval"
                label="Rest Interval"
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
