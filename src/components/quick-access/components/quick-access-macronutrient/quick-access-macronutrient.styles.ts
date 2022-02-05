import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<{ variant?: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${({ variant }) =>
    variant === 'dark' ? getColorCarry('neutral_100') : 'white'};
  border-radius: 10px;
  min-width: 115px;
  margin: 0.25rem;
  flex-grow: 1;

  .Macronutrient {
    &__name {
      font-size: 0.875rem;
      color: ${({ variant }) =>
        variant === 'dark'
          ? getColorCarry('neutral_40')
          : getColorCarry('neutral_70')};
      font-weight: 700;
    }

    &__value {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${({ variant }) =>
        variant === 'dark' ? 'white' : getColorCarry('neutral_100')};
    }

    &__subtitle {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_60')};
    }
  }
`
