import { get } from 'lodash'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './food-accordion.styles'

interface FoodAccordionProps {
  name: string
  onRemove: any
}
export default function FoodAccordion({ name }: FoodAccordionProps) {
  const methods = useFormContext()

  const foodName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const onChange = (name: string, value: string) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  return (
    <SubItemAccordion
      title={foodName}
      content={
        <Styles>
          <Controller
            render={({ field: { value, name } }) => (
              <Select
                id="Food-name"
                label="Food name"
                placeholder="Food one"
                className="FoodAccordion__control"
                options={[
                  { label: 'Brown Rice', value: 'Brown Rice' },
                  { label: 'Fried Eggs', value: 'Fried Eggs' }
                ]}
                value={value}
                onChange={(e) => onChange(name, e)}
              />
            )}
            name={`${name}.name`}
          />

          <div className="FoodAccordion__controls">
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
          </div>
        </Styles>
      }
    />
  )
}
