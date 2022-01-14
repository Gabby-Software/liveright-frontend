import { ChangeEvent } from 'react'

import {
  CounterMinusIcon,
  CounterPlusIcon
} from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import { Styles } from './counter.styles'

interface CounterProps {
  onChange: (value: number) => void
  value: number
  maxValue: number
}
export default function Counter(props: CounterProps) {
  const { value, onChange, maxValue } = props

  const handleIncrease = () => {
    if (isNaN(maxValue)) {
      onChange(value + 1)
    } else {
      onChange(Math.min(maxValue, value + 1))
    }
  }

  const handleDecrease = () => {
    onChange(Math.max(0, value - 1))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value)
  }

  return (
    <Styles>
      <Label>How many days should your plan have?</Label>

      <div className="counter__content">
        <IconButton className="counter__btn" onClick={handleDecrease}>
          <CounterMinusIcon />
        </IconButton>

        <Input
          id="counter"
          className="counter__input"
          value={value}
          onChange={handleChange}
          type="number"
        />

        <IconButton className="counter__btn" onClick={handleIncrease}>
          <CounterPlusIcon />
        </IconButton>
      </div>
    </Styles>
  )
}
