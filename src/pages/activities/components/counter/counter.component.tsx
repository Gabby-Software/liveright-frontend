import {
  CounterMinusIcon,
  CounterPlusIcon
} from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import { Styles } from './counter.styles'

export default function Counter() {
  return (
    <Styles>
      <Label>How many days should your plan have?</Label>

      <div className="counter__content">
        <IconButton className="counter__btn">
          <CounterMinusIcon />
        </IconButton>

        <Input id="counter" className="counter__input" />

        <IconButton className="counter__btn">
          <CounterPlusIcon />
        </IconButton>
      </div>
    </Styles>
  )
}
