import { FC, ReactNode } from 'react'

import {
  Wrapper,
  Title,
  PriceText,
  PriceWrapper,
  CurrentWrapper,
  Icon
} from './financials-goals-card.styles'

interface FinancialsGoalsCardProps {
  title: string
  planned: string
  current?: number
  icon?: ReactNode
}

const FinancialsGoalsCard: FC<FinancialsGoalsCardProps> = ({
  title,
  planned,
  current,
  icon
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <PriceWrapper>
        {planned}
        <PriceText>AEM</PriceText>
      </PriceWrapper>
      <CurrentWrapper>Current: {current}</CurrentWrapper>
      <Icon>{icon}</Icon>
    </Wrapper>
  )
}

export default FinancialsGoalsCard
