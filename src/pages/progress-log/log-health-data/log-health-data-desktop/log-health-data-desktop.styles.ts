import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled.div`
  padding-bottom: 4rem;

  .log-health {
    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.875rem;
    }

    &__container {
      display: flex;
    }
  }
`

export const CardsWrapper = styled.div`
  flex: 1;
  padding-right: 2.5rem;
  position: relative;
`

export const InputsWrapper = styled.div`
  padding: 0 1.875rem;
  border-left: 1px solid ${getColorCarry('inputBorder_v2')};
  border-right: 1px solid ${getColorCarry('inputBorder_v2')};

  .log-health {
    &__sleep-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }
`

export const LogCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.875rem;
  margin-bottom: 1.25rem;
`
