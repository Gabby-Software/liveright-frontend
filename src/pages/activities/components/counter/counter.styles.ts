import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .counter {
    &__content {
      display: flex;
      align-items: center;
    }

    &__input {
      width: 85px;
      margin: 0 0.75rem;
    }

    &__btn {
      background-color: ${getColorCarry('neutral_30')};
      width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
