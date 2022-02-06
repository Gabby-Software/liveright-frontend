import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: #f2f5f7;
  border-radius: 10px;
  min-width: 115px;
  margin: 0.25rem;
  flex-grow: 1;

  div {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .Macronutrient {
    &__name {
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      color: ${getColorCarry('neutral_100')};
    }

    &__value {
      font-weight: bold;
      font-size: 22px;
      line-height: 32px;
      color: ${getColorCarry('neutral_100')};
    }

    &__comparison {
      display: flex;
      align-items: center;
    }

    &__subtitle {
      font-size: 12px;
      line-height: 16px;
      color: ${getColorCarry('neutral_60')};
    }
  }
`
