import { FC, SVGProps } from 'react'

import { CheckIcon } from '../../../../assets/media/icons'
import Styles from './quick-access-log-item.styles'

interface Props {
  Icon: FC<SVGProps<SVGSVGElement>>
  iconColor: string
  name: string
  amount: string
  completed: boolean
  onClick?: () => void
}

const QuickAccessLogItem: FC<Props> = ({
  Icon,
  iconColor,
  name,
  amount,
  completed,
  onClick
}) => {
  return (
    <Styles iconColor={iconColor} completed={completed} onClick={onClick}>
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

export default QuickAccessLogItem
