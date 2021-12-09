import { Controller, useFormContext } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
// import Select from '../../../../../../components/form/select/select.component'
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
            onChange={(e) => methods.setValue(name, e.target.value)}
          />
        )}
      />

      <Controller
        name={`${name}.info.steps`}
        render={({ field: { name, value } }) => (
          <Input
            id="Exercise-steps"
            label="Steps"
            placeholder="10"
            value={value}
            onChange={(e) => methods.setValue(name, e.target.value)}
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
            onChange={(e) => methods.setValue(name, e.target.value)}
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
            onChange={(e) => methods.setValue(name, e.target.value)}
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
            onChange={(e) => methods.setValue(name, e.target.value)}
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
            onChange={(e) => methods.setValue(name, e.target.value)}
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
