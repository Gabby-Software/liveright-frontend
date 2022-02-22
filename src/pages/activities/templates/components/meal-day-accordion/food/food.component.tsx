import { get } from 'lodash'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Input from '../../../../../../components/form/input/input.component'
import formatter from '../../../../../../managers/formatter.manager'
import { Styles } from './food.styles'

interface FoodProps {
  dragHandleProps: any
  isDragging: boolean
  innerRef?: any
  draggableProps: any
  name: string
  onRemove: any
  readOnlyForm?: boolean
}

export default function Food({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  name,
  onRemove,
  readOnlyForm
}: FoodProps) {
  const methods = useFormContext()

  const info = useWatch({
    control: methods.control,
    name: `${name}.info`
  })

  const onChange = (fieldName: string, value: string | boolean | number) => {
    methods.setValue(fieldName, value, { shouldValidate: true })
  }

  useEffect(() => {
    onChange(
      `${name}.info.calories`,
      getTwoDecimal(
        (info.proteins || 0) * 4 +
          (info.net_carbs || 0) * 4 +
          (info.fat || 0) * 9
      )
    )
    onChange(
      `${name}.info.total_carbs`,
      getTwoDecimal((+info.net_carbs || 0) + (+info.fiber || 0))
    )
  }, [info.proteins, info.net_carbs, info.fat, info.fiber])

  const { errors } = methods.formState

  const getTwoDecimal = (value: any) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  return (
    <Styles $isDragging={isDragging} ref={innerRef} {...draggableProps}>
      <div className="Food__drag">
        <button className="Food__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      <Controller
        render={({ field: { value, name } }) => (
          <AutoCompleteInput
            id="Food-name"
            label="Food name"
            placeholder="-"
            value={value}
            onChange={(value) => {
              methods.setValue(name, value)
            }}
            options={[]}
            // error={get(errors, name)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
            disabled={readOnlyForm}
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
            value={value}
            onChange={(e) => {
              onChange(name, e.target.value)
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
            disabled={readOnlyForm}
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
            onChange={(e) => {
              onChange(name, getTwoDecimal(+e.target.value))
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
            disabled={readOnlyForm}
          />
        )}
        name={`${name}.info.proteins`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Fat"
            label="Fat"
            placeholder="-"
            value={value}
            onChange={(e) => {
              onChange(name, getTwoDecimal(+e.target.value))
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
            disabled={readOnlyForm}
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
            onChange={(e) => {
              onChange(name, getTwoDecimal(+e.target.value))
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
            disabled={readOnlyForm}
          />
        )}
        name={`${name}.info.net_carbs`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Sugar"
            label="Sugar"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, getTwoDecimal(+e.target.value))}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            disabled={readOnlyForm}
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
            onChange={(e) => onChange(name, getTwoDecimal(+e.target.value))}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            disabled={readOnlyForm}
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
            format={formatter().number().min(0).max(10000)}
            disabled
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
            format={formatter().number().min(0).max(10000)}
            disabled={true}
          />
        )}
        name={`${name}.info.calories`}
      />

      {!readOnlyForm && (
        <div className="Food__delete">
          <IconButton className="Food__delete-btn" onClick={onRemove}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
      )}
    </Styles>
  )
}
