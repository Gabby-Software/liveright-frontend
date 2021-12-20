import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import { DragIcon } from '../../../../../../assets/media/icons/activities'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { Styles } from './food.styles'

interface FoodProps {
  dragHandleProps: any
  isDragging: boolean
  innerRef?: any
  draggableProps: any
  data: any
}

const options = [
  { value: 'food_1', label: 'Chicken Brest Tender' },
  { value: 'food_2', label: 'Brown Rice' },
  { value: 'food_31', label: 'Red Apple' },
  { value: 'food_4', label: 'Food 1' },
  { value: 'food_5', label: 'Food 2' },
  { value: 'food_7', label: 'Food 4' },
  { value: 'food_6', label: 'Food 3' }
]
export default function Food({
  dragHandleProps,
  isDragging,
  innerRef,
  draggableProps,
  data
}: FoodProps) {
  return (
    <Styles $isDragging={isDragging} ref={innerRef} {...draggableProps}>
      <div className="Food__drag">
        <button className="Food__drag-btn" {...dragHandleProps}>
          <DragIcon />
        </button>
      </div>

      <Select
        id="Food-name"
        label="Food name"
        placeholder="Food one"
        options={options}
        value={data?.id}
      />
      <Input
        id="Food-Qty(gr)"
        label="Qty(gr)"
        placeholder="-"
        defaultValue={data?.amount}
      />
      <Input id="Food-Proteins" label="Proteins" placeholder="-" />
      <Input id="Food-Fat" label="Fat" placeholder="-" />
      <Input id="Food-Net Carbs" label="Net Carbs" placeholder="-" />
      <Input id="Food-Sugar" label="Sugar" placeholder="-" />
      <Input id="Food-Fiber" label="Fiber" placeholder="-" />
      <Input id="Food-Carbs" label="Carbs" placeholder="-" />
      <Input id="Food-Calories" label="Calories" placeholder="-" />

      <div className="Food__delete">
        <IconButton className="Food__delete-btn">
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    </Styles>
  )
}
