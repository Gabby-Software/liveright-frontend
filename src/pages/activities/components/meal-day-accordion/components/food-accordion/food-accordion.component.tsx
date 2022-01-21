import { get } from 'lodash'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import formatter from '../../../../../../managers/formatter.manager'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './food-accordion.styles'

interface FoodAccordionProps {
  dragHandleProps: any
  isDragging?: boolean
  innerRef?: any
  draggableProps: any
  name: string
  onRemove: any
}
export default function FoodAccordion({
  dragHandleProps,
  innerRef,
  draggableProps,
  name,
  onRemove
}: FoodAccordionProps) {
  const methods = useFormContext()

  const foodName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const info = useWatch({
    control: methods.control,
    name: `${name}.info`
  })

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  useEffect(() => {
    methods.setValue(
      `${name}.info.calories`,
      (info.proteins || 0) * 4 +
        (info.net_carbs || 0) * 4 +
        (info.fat || 0) * 9,
      { shouldValidate: true }
    )
  }, [info.proteins, info.net_carbs, info.fat])

  const { errors } = methods.formState

  return (
    <div ref={innerRef} {...draggableProps}>
      <SubItemAccordion
        dragHandleProps={dragHandleProps}
        title={foodName}
        onRemove={onRemove}
        content={
          <Styles>
            <Controller
              render={({ field: { value, name } }) => (
                <AutoCompleteInput
                  id="Food-name"
                  label="Food name"
                  placeholder="Food one"
                  options={[
                    { label: 'Brown Rice', value: 'Brown Rice' },
                    { label: 'Fried Eggs', value: 'Fried Eggs' }
                  ]}
                  value={value}
                  onChange={(e) => onChange(name, e)}
                  className={
                    get(errors, name)
                      ? 'FoodAccordion__control invalid-field'
                      : 'FoodAccordion__control'
                  }
                  shouldScrollTo={get(errors, name)}
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
                    onChange={(e) => onChange(name, e.target.value)}
                    error={get(errors, name)}
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
                    onChange={(e) => onChange(name, e.target.value)}
                    error={get(errors, name)}
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
                    onChange={(e) => onChange(name, e.target.value)}
                    error={get(errors, name)}
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
            </div>

            <Controller
              render={({ field: { value, name } }) => (
                <div className="FoodAccordion__checkbox-container">
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(name, e.target.checked)}
                  />
                  <Label className="FoodAccordion__checkbox">
                    Save as re-usable template
                  </Label>
                </div>
              )}
              name={`${name}.save_as_template`}
            />
          </Styles>
        }
      />
    </div>
  )
}
