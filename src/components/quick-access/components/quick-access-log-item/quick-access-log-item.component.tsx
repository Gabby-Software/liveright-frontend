import { FC, SVGProps } from 'react'

import { CheckIcon } from '../../../../assets/media/icons'
import Styles from './quick-access-log-item.styles'

interface Props {
  Icon: FC<SVGProps<SVGSVGElement>>
  iconColor: string
  name: string
  amount: string
  completed: boolean
}

const QuickAccessLogExerciseItem: FC<Props> = ({
  Icon,
  iconColor,
  name,
  amount,
  completed
}) => {
  return (
    <Styles iconColor={iconColor} completed={completed}>
      <Icon className="qa-log-item__icon" />
      <div>
        <h3>{name}</h3>
        <p>{amount}</p>
      </div>
      {completed && (
        <div className="qa-log-item__checkIcon">
          <CheckIcon />
        </div>
      )}
    </Styles>
  )
}

export default QuickAccessLogExerciseItem
