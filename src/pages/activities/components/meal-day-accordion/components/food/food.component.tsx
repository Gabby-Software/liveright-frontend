import { get } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useParams } from 'react-router'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import useTemplateFoods from '../../../../../../hooks/api/templates/useTemplateFoods'
import formatter from '../../../../../../managers/formatter.manager'
import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
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
  const [macros, setMacros] = useState<any>({
    proteins: 0,
    fat: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    total_carbs: 0,
    calories: 0
  })
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const { clientId } = useParams<any>()

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

  const { foods } = useTemplateFoods({ clientId: 'all' })

  const days = useWatch({
    name: `days`,
    control: methods.control
  })

  const [foodName] = useWatch({
    control: methods.control,
    name: [`${name}.name`]
  })

  const getTwoDecimal = (value: any) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  const multiplyMacros = (grams: any) => {
    methods.setValue(
      `${name}.info.proteins`,
      getTwoDecimal(macros.proteins * (grams / 100) || 0)
    )
    methods.setValue(`${name}.info.fat`, getTwoDecimal(macros.fat * grams || 0))
    methods.setValue(
      `${name}.info.net_carbs`,
      getTwoDecimal(macros.net_carbs * (grams / 100) || 0)
    )
    methods.setValue(
      `${name}.info.sugar`,
      getTwoDecimal(macros.sugar * (grams / 100) || 0)
    )
    methods.setValue(
      `${name}.info.fiber`,
      getTwoDecimal(macros.fiber * (grams / 100) || 0)
    )
  }

  const getFoodsOfPlan = () => {
    const mealsOfPlan = days?.reduce(
      (acc: any[], d: any) => [
        ...acc,
        ...(d.activities || d.diet_plan_day.activities || [])
      ],
      []
    )

    const foodsOfPlan: any[] = mealsOfPlan?.reduce(
      (item: any[], acc: any) => [...item, ...(acc.items || [])],
      []
    )

    return foodsOfPlan.filter((f) => !f.data.fromTemplate)
  }

  const onFoodSelected = (value: string) => {
    // find in templates
    let food = foods.find((m: any) => m._id === value)

    if (!food) {
      // else not found, check in current DP
      const foodsOfPlan = getFoodsOfPlan()
      food = foodsOfPlan.find((m: any) => m?.data?.name === value)?.data
      setSelectedTemplate(null)
    } else {
      // found in template
      setSelectedTemplate(food)
      methods.setValue(
        `${name.substring(0, name.lastIndexOf('.'))}.fromTemplate`,
        true
      )
      methods.setValue(
        `${name.substring(0, name.lastIndexOf('.'))}._id`,
        food._id
      )
    }

    if (food) {
      // // if you just try to set workout as a whole, exercise fields i.e. exerciseArray would not update.
      methods.setValue(`${name}.name`, food.name || '')
      methods.setValue(`${name}.info.grams`, food.info.grams)
      methods.setValue(
        `${name}.info.proteins`,
        getTwoDecimal(food.info?.proteins || 0)
      )
      methods.setValue(`${name}.info.fat`, getTwoDecimal(food.info?.fat || 0))
      methods.setValue(
        `${name}.info.net_carbs`,
        getTwoDecimal(food.info?.net_carbs || 0)
      )
      methods.setValue(
        `${name}.info.sugar`,
        getTwoDecimal(food.info?.sugar || 0)
      )
      methods.setValue(
        `${name}.info.fiber`,
        getTwoDecimal(food.info?.fiber || 0)
      )

      setMacros({
        proteins: food?.info?.proteins || 0,
        fat: food?.info?.fat || 0,
        net_carbs: food?.info?.net_carbs || 0,
        sugar: food?.info?.sugar || 0,
        fiber: food?.info?.fiber || 0
      })
    }
  }

  const nameOptions = useMemo(() => {
    const foodsOfPlan = getFoodsOfPlan()

    const planOptions = foodsOfPlan
      ?.filter(
        (w: any) =>
          w?.data?.name?.toLowerCase()?.includes(foodName?.toLowerCase()) &&
          w?.data?.name !== foodName
      )
      ?.map((m: any) => ({
        label: m?.data?.name,
        value: m?.data?.name
      }))

    const templateOptions = foods
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(foodName?.toLowerCase()) &&
          w?.name !== foodName
      )
      ?.map((w: any) => ({
        label: w.name,
        value: w._id
      }))

    const options = []

    if (planOptions.length) {
      options.push({
        label: 'From this Diet Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [days, foods])

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
              setSelectedTemplate(null)
            }}
            onSelect={onFoodSelected}
            options={nameOptions}
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
              selectedTemplate && multiplyMacros(e.target.value)
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

      {!readOnlyForm && (
        <Controller
          render={({ field: { value, name } }) => (
            <div className="Food__checkbox-container">
              <Checkbox
                checked={value}
                onChange={(e) => onChange(name, e.target.checked)}
              />
              <Label className="Food__checkbox">
                {selectedTemplate?.account_id === +clientId
                  ? 'Update template'
                  : 'Save Food as template'}
              </Label>
            </div>
          )}
          name={`${name}.save_as_template`}
        />
      )}
    </Styles>
  )
}
