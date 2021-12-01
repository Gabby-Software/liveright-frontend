import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import SubItemAccordion from '../../../sub-item-accordion/sub-item-accordion.component'
import { Styles } from './food-accordion.styles'

export default function FoodAccordion() {
  return (
    <SubItemAccordion
      title="Meat"
      content={
        <Styles>
          <Select
            id="Food-name"
            label="Food name"
            placeholder="Food one"
            options={[]}
            className="FoodAccordion__control"
          />

          <div className="FoodAccordion__controls">
            <Input id="Food-Qty(gr)" label="Qty(gr)" placeholder="-" />
            <Input id="Food-Proteins" label="Proteins" placeholder="-" />
            <Input id="Food-Fat" label="Fat" placeholder="-" />
            <Input id="Food-Net Carbs" label="Net Carbs" placeholder="-" />
            <Input id="Food-Sugar" label="Sugar" placeholder="-" />
            <Input id="Food-Fiber" label="Fiber" placeholder="-" />
            <Input id="Food-Carbs" label="Carbs" placeholder="-" />
            <Input id="Food-Calories" label="Calories" placeholder="-" />
          </div>
        </Styles>
      }
    />
  )
}
