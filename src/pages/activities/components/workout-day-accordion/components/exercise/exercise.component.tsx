import get from 'lodash.get'
import { Controller, useFormContext } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import formatter from '../../../../../../managers/formatter.manager'
import { Styles } from './exercise.styles'

interface ExerciseProps {
  dragHandleProps: any
  isDragging: boolean
  innerRef?: any
  draggableProps: any
  name: string
  onRemove: any
}

export default function Exercise({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  name,
  onRemove
}: ExerciseProps) {
  const methods = useFormContext()

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  return (
    <Styles $isDragging={isDragging} ref={innerRef} {...draggableProps}>
      <div className="Exercise__drag">
        <button className="Exercise__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      {/*<Select*/}
      {/*  id="Exercise-name"*/}
      {/*  label="Exercise name"*/}
      {/*  placeholder="1A--"*/}
      {/*  options={[]}*/}
      {/*/>*/}

      <Controller
        name={`${name}.name`}
        render={({ field: { name, value } }) => (
          <Input
            id="Exercise-name"
            label="Exercise name"
            placeholder="1A--"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
      />

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

      <div className="Exercise__delete">
        <IconButton className="Exercise__delete-btn" onClick={onRemove}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </Styles>
  )
}
