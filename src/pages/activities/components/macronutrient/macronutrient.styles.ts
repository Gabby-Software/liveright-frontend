import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${getColorCarry('neutral_100')};
  border-radius: 10px;
  min-width: 125px;
  margin: 0.25rem;

  .Macronutrient {
    &__name {
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_40')};
      font-weight: 700;
    }

    &__value {
      font-size: 1.375rem;
      font-weight: 700;
      color: #fff;
    }

    &__subtitle {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_60')};
    }
  }
`
