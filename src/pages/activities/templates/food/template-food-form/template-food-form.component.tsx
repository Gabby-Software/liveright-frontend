import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { FoodIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import useTemplateFood from '../../../../../hooks/api/templates/useTemplateFood'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import HeaderLink from '../../../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../../../layouts/mobile-page/mobile-page.component'
import Food from './food/food.component'
import FoodAccordion from './food-accordion/food-accordion.component'
import Styles, { MealStyles, MealSubtitle } from './template-food-form'

interface IProps {
  onClose: () => void
}

const defaultValues = {
  name: '',
  time: '',
  items: []
}
export default function TemplateMealForm({ onClose }: IProps) {
  const isMobile = useIsMobile()
  const { id } = useParams<any>()
  const { food, onEdit } = useTemplateFood({ id })

  const methods = useForm<any>({
    defaultValues
  })

  useEffect(() => {
    if (food._id) {
      methods.setValue('foodItem', food)
    }
  }, [food._id])

  const handleSave = () => {
    methods.handleSubmit((values) =>
      onEdit(id, values.foodItem, () => onClose())
    )()
    // methods.handleSubmit((values) => console.log(values.foodItem))()
  }

  const content = (
    <FormProvider {...methods}>
      <MealStyles>
        <div className="Meal__header">
          <div className="Meal__header-title">
            <div className="Meal__header-icon">
              <FoodIcon />
            </div>
            <div className="subtitle">{food.name || 'Food'}</div>
          </div>

          <Button onClick={handleSave}>Save</Button>
        </div>

        <MealSubtitle>Food</MealSubtitle>

        <div className="Meal__food-container">
          {isMobile ? (
            <FoodAccordion name={`foodItem`} />
          ) : (
            <Food name={`foodItem`} />
          )}
        </div>
      </MealStyles>
    </FormProvider>
  )

  return isMobile ? (
    <MobilePage
      title="Editing Meal Template"
      headerTopComponent={
        <HeaderLink onClick={onClose}>Go Back to Overview</HeaderLink>
      }
    >
      <Styles>{content}</Styles>
    </MobilePage>
  ) : (
    <Styles>
      <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
      <h1 className="Title">Editing Meal Template</h1>
      {content}
    </Styles>
  )
}
