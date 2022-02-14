import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<{ variant?: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
  gap: ${({ variant }) => (variant === 'dark' ? '' : '5px')};
  padding: ${({ variant }) =>
    variant === 'dark' ? '15px 0 15px 15px' : '20px'};
  background-color: ${({ variant }) =>
    variant === 'dark' ? getColorCarry('neutral_100') : 'white'};
  border-radius: ${({ variant }) => (variant === 'dark' ? '12px' : '10px')};
  min-width: ${({ variant }) => (variant === 'dark' ? '95px' : '115px')};
  min-height: ${({ variant }) => (variant === 'dark' ? '76px' : '93px')};
  margin: 0.25rem;
  flex-grow: 1;

  .Macronutrient {
    &__name {
      font-size: 14px;
      line-height: 20px;
      color: ${({ variant }) =>
        variant === 'dark'
          ? getColorCarry('white')
          : getColorCarry('neutral_70')};
      font-weight: normal;
    }

    &__value {
      font-size: 18px;
      line-height: 26px;
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
