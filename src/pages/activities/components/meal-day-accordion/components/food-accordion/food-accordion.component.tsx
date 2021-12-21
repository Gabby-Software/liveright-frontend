import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './food-accordion.styles'

interface FoodAccordionProps {
  title: string
  value: any
}
export default function FoodAccordion({ title, value }: FoodAccordionProps) {
  return (
    <SubItemAccordion
      title={title}
      content={
        <Styles>
          <Select
            id="Food-name"
            label="Food name"
            placeholder="Food one"
            value={title}
            options={[
              { label: 'Brown Rice', value: 'Brown Rice' },
              { label: 'Fried Eggs', value: 'Fried Eggs' }
            ]}
            className="FoodAccordion__control"
          />

          <div className="FoodAccordion__controls">
            <Input
              id="Food-Qty(gr)"
              label="Qty(gr)"
              placeholder="-"
              value={value.qty}
            />
            <Input
              id="Food-Proteins"
              label="Proteins"
              placeholder="-"
              value={value.protein}
            />
            <Input
              id="Food-Fat"
              label="Fat"
              placeholder="-"
              value={value.fat}
            />
            <Input
              id="Food-Net Carbs"
              label="Net Carbs"
              placeholder="-"
              value={value.netcarb}
            />
            <Input
              id="Food-Sugar"
              label="Sugar"
              placeholder="-"
              value={value.sugar}
            />
            <Input
              id="Food-Fiber"
              label="Fiber"
              placeholder="-"
              value={value.fiber}
            />
            <Input
              id="Food-Carbs"
              label="Carbs"
              placeholder="-"
              value={value.carb}
            />
            <Input
              id="Food-Calories"
              label="Calories"
              placeholder="-"
              value={value.calories}
            />
          </div>
        </Styles>
      }
    />
  )
}
