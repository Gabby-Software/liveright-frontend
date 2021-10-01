import { FC, ReactNode } from 'react'

import {
  CurrentText,
  CurrentWrapper,
  Icon,
  PriceText,
  PriceWrapper,
  Title,
  Wrapper
} from './financials-goals-card.styles'

interface FinancialsGoalsCardProps {
  title: string
  planned: string
  current?: number
  icon: ReactNode
  currency?: string
}

const FinancialsGoalsCard: FC<FinancialsGoalsCardProps> = ({
  title,
  planned,
  current,
  icon,
  currency = ''
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <PriceWrapper>
        {planned}
        <PriceText>{currency}</PriceText>
      </PriceWrapper>
      <CurrentWrapper>
        Current
        <CurrentText>
          {current} {currency}
        </CurrentText>
      </CurrentWrapper>
      <Icon>{icon}</Icon>
    </Wrapper>
  )
}

export default FinancialsGoalsCard
