import { get } from 'lodash'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Input from '../../../../../../components/form/input/input.component'
import formatter from '../../../../../../managers/formatter.manager'
import { Styles } from './food-day.styles'

interface FoodDayProps {
  dragHandleProps?: any
  isDragging?: boolean
  innerRef?: any
  draggableProps?: any
  name?: string
  onRemove?: any
}

export default function FoodDay({
  isDragging,
  innerRef,
  draggableProps,
  name
}: FoodDayProps) {
  const methods = useFormContext()

  const targets = useWatch({
    control: methods.control,
    name: `${name}.custom_target`
  })

  const onChange = (fieldName: string, value: string | boolean | number) => {
    methods.setValue(fieldName, value, { shouldValidate: true })
  }

  useEffect(() => {
    onChange(
      `${name}.custom_target.calories`,
      (targets?.proteins || 0) * 4 +
        (targets?.net_carbs || 0) * 4 +
        (targets?.fat || 0) * 9
    )
  }, [targets?.proteins, targets?.net_carbs, targets?.fat])

  const { errors } = methods.formState

  return (
    <Styles $isDragging={isDragging} ref={innerRef} {...draggableProps}>
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Proteins"
            label="Proteins"
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
          />
        )}
        name={`${name}.custom_target.proteins`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Fat"
            label="Fat"
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
          />
        )}
        name={`${name}.custom_target.fat`}
      />
      <Controller
        render={({ field: { value, name } }) => (
          <Input
            id="Food-Net Carbs"
            label="Net Carbs"
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
          />
        )}
        name={`${name}.custom_target.net_carbs`}
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
            format={formatter().number().min(0).max(10000)}
          />
        )}
        name={`${name}.custom_target.sugar`}
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
            format={formatter().number().min(0).max(10000)}
          />
        )}
        name={`${name}.custom_target.fiber`}
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
        name={`${name}.custom_target.calories`}
      />
    </Styles>
  )
}
