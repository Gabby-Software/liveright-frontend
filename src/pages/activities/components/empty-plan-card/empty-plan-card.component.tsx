import { ReactNode } from 'react'

import { Styles } from './empty-plan-card.styles'

export interface EmptyPlanCardProps {
  Icon: any
  text: string
  action: ReactNode
}

export default function EmptyPlanCard({
  Icon,
  text,
  action
}: EmptyPlanCardProps) {
  return (
    <Styles>
      <Icon className="EmptyPlanCard__icon" />
      <p className="EmptyPlanCard__text">{text}</p>

      {action}
    </Styles>
  )
}
