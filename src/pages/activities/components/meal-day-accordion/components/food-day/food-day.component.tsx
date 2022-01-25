import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

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

  // const info = useWatch({
  //   control: methods.control,
  //   name: `${name}.info`
  // })

  console.log(methods.getValues())

  const onChange = (fieldName: string, value: string | boolean) => {
    methods.setValue(fieldName, value, { shouldValidate: true })
  }

  // useEffect(() => {
  //   methods.setValue(
  //     `${name}.info.calories`,
  //     (info.proteins || 0) * 4 +
  //       (info.net_carbs || 0) * 4 +
  //       (info.fat || 0) * 9,
  //     { shouldValidate: true }
  //   )
  // }, [info.proteins, info.net_carbs, info.fat])

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
              onChange(name, e.target.value)
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
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
              onChange(name, e.target.value)
            }}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
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
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
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
            format={formatter().number().min(0).max(10000)}
          />
        )}
        name={`${name}.info.fiber`}
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
    </Styles>
  )
}
