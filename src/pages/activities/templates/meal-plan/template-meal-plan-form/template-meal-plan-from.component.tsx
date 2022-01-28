import { get } from 'lodash'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch
} from 'react-hook-form'
import { useParams } from 'react-router'
import { v4 as uuid } from 'uuid'

import { AddIcon, FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import { EmptyPlaceholder } from '../../../../../components/placeholders'
import useTemplateMeal from '../../../../../hooks/api/templates/meals/useTemplateMeal'
import Food from '../../../components/meal-day-accordion/components/food/food.component'
import Styles, {
  MealStyles,
  MealSubtitle
} from './template-meal-plan-from.style'

interface IProps {
  onClose: () => void
}

function createFood() {
  return {
    data: {
      name: '',
      save_as_template: false,
      info: {
        grams: '',
        proteins: '',
        fat: '',
        net_carbs: '',
        sugar: '',
        fiber: '',
        total_carbs: '',
        calories: ''
      }
    }
  }
}

const defaultValues = {
  name: '',
  time: '',
  items: []
}

const MACROS_LABEL_KEY_MAP = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}

export default function TemplateMealForm({ onClose }: IProps) {
  const [dropId] = useState(uuid())
  const [totalMacros, setTotalMacros] = useState({
    grams: 0,
    proteins: 0,
    fat: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    total_carbs: 0,
    calories: 0
  })

  const { id } = useParams<any>()
  const { meal, onEdit } = useTemplateMeal({ id })

  const methods = useForm<any>({
    defaultValues
  })

  const foodsArray = useFieldArray({
    control: methods.control,
    name: `items`
  })

  useEffect(() => {
    if (meal._id) {
      methods.setValue('name', meal.name)
      foodsArray.remove(
        Array(foodsArray.fields.length)
          .fill(1)
          .map((v, i) => i)
      )
      foodsArray.append(meal.items)
    }
  }, [meal._id])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    foodsArray.move(result.source.index, (result.destination as any).index)
  }

  const [mealName] = useWatch({
    control: methods.control,
    name: [`name`]
  })

  const { errors } = methods.formState

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

  const calculateTotalMacros = () => {
    const items: any[] = methods.getValues(`items`)

    const macros = {
      grams: 0,
      proteins: 0,
      fat: 0,
      net_carbs: 0,
      sugar: 0,
      fiber: 0,
      total_carbs: 0,
      calories: 0
    }

    items?.forEach((i) => {
      const info = i.data.info
      Object.keys(macros).map((k: string) => {
        return ((macros as any)[k] += parseInt(info[k] || 0))
      })
    })

    setTotalMacros(macros)
  }

  methods.watch(() => {
    calculateTotalMacros()
  })

  return (
    <FormProvider {...methods}>
      <Styles>
        <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
        <h1 className="Title">Editing Meal Template</h1>
        <MealStyles>
          <div className="Meal__header">
            <div className="Meal__header-title">
              <div className="Meal__header-icon">
                <FoodIcon />
              </div>
              <div className="subtitle">{mealName || meal.name || 'Meal'}</div>
            </div>

            <Button onClick={handleSave}>Save</Button>
          </div>
          <div className="Meal__name">
            <Controller
              name={`name`}
              render={({ field: { value, name } }) => (
                <AutoCompleteInput
                  id="Meal-title"
                  label="Meal Name"
                  placeholder="Name of Meal"
                  value={value}
                  onChange={(value) => methods.setValue(name, value)}
                  options={[]}
                  className={get(errors, name) ? 'invalid-field' : ''}
                />
              )}
            />
          </div>

          <div className="Meal__macronutrients">
            {Object.keys(MACROS_LABEL_KEY_MAP).map((k) => (
              <div key={k} className="Meal__macronutrient">
                <p className="Meal__macronutrient-title">{k}</p>
                <p className="Meal__macronutrient-value">
                  {(totalMacros as any)[(MACROS_LABEL_KEY_MAP as any)[k]]}
                  {k === 'Calories' ? 'KCal' : 'g'}
                </p>
              </div>
            ))}
          </div>

          <MealSubtitle>Food</MealSubtitle>

          <div className="Meal__food-container">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={dropId}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {foodsArray.fields &&
                      foodsArray.fields.map((row: any, index: number) => (
                        <Draggable
                          key={row.id}
                          draggableId={`${row.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Food
                              innerRef={provided.innerRef}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              isDragging={snapshot.isDragging}
                              name={`items.${[index]}.data`}
                              onRemove={() => handleFoodRemove(index)}
                            />
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {!foodsArray.fields.length && (
              <div
                className="Meal__clickable-container"
                onClick={handleFoodAdd}
              >
                <EmptyPlaceholder spacing text="Add Foods" />
              </div>
            )}
          </div>

          <div className="Meal__divider" />

          <p className="Meal__add-btn" onClick={handleFoodAdd}>
            <AddIcon />
            Add Food
          </p>
        </MealStyles>
      </Styles>
    </FormProvider>
  )
}
