import { get } from 'lodash'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Input from '../../../../../../components/form/input/input.component'
import formatter from '../../../../../../managers/formatter.manager'
import { Styles } from './food.styles'

interface FoodProps {
  name: string
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

export default function Food({ name }: FoodProps) {
  const methods = useFormContext()

  const info = useWatch({
    control: methods.control,
    name: `${name}.info`
  })

  const onChange = (fieldName: string, value: string | boolean) => {
    methods.setValue(fieldName, value, { shouldValidate: true })
  }

  useEffect(() => {
    methods.setValue(
      `${name}.info.calories`,
      (info?.proteins || 0) * 4 +
        (info?.net_carbs || 0) * 4 +
        (info?.fat || 0) * 9,
      { shouldValidate: true }
    )
  }, [info?.proteins, info?.net_carbs, info?.fat])

  const { errors } = methods.formState

  return (
    <Styles>
      <Controller
        render={({ field: { value, name } }) => (
          <AutoCompleteInput
            id="Food-name"
            label="Food name"
            placeholder="Food one"
            options={options}
            value={value}
            onChange={(e) => onChange(name, e)}
            // error={get(errors, name)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
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
            onChange={(e) => onChange(name, e.target.value)}
            // error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
            className={get(errors, name) ? 'invalid-field' : ''}
            shouldScrollTo={get(errors, name)}
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
            id="Total-Carbs"
            label="Total Carbs"
            placeholder="-"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            error={get(errors, name)}
            ErrorProps={{ size: 'sm' }}
            format={formatter().number().min(0).max(10000)}
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
    </Styles>
  )
}
