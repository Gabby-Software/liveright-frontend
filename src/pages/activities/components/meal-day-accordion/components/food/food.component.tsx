import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { Styles } from './food.styles'

interface FoodProps {
  dragHandleProps: any
  isDragging: boolean
  innerRef?: any
  draggableProps: any
  name: string
  onRemove: any
}

const options = [
  { value: 'Chicken Brest Tender', label: 'Chicken Brest Tender' },
  { value: 'Brown Rice', label: 'Brown Rice' },
  { value: 'Red Apple', label: 'Red Apple' },
  { value: 'Food 1', label: 'Food 1' },
  { value: 'Food 2', label: 'Food 2' },
  { value: 'Food 4', label: 'Food 4' },
  { value: 'Food 3', label: 'Food 3' }
]

export default function Food({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  name,
  onRemove
}: FoodProps) {
  const methods = useFormContext()

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  return (
    <Styles $isDragging={isDragging} ref={innerRef} {...draggableProps}>
      <div className="Food__drag">
        <button className="Food__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      <Controller
        render={({ field: { value, name } }) => (
          <Select
            id="Food-name"
            label="Food name"
            placeholder="Food one"
            options={options}
            value={value}
            onChange={(e) => onChange(name, e)}
          />
        )}
        name={`${name}.name`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Qty(gr)"
            label="Qty(gr)"
            placeholder="-"
            defaultValue={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.grams`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Proteins"
            label="Proteins"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.protein`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Fat"
            label="Fat"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.fat`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Net Carbs"
            label="Net Carbs"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.carbs`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Sugar"
            label="Sugar"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.sugar`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Fiber"
            label="Fiber"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.fiber`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Total-Carbs"
            label="Total Carbs"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.total_carbs`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Calories"
            label="Calories"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
          />
        )}
        name={`${name}.info.calories`}
      />

      <div className="Food__delete">
        <IconButton className="Food__delete-btn" onClick={onRemove}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </Styles>
  )
}