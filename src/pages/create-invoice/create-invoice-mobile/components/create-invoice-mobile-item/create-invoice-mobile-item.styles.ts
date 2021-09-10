import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  margin-bottom: 0.75rem;
  transition: ${(p) => p.theme.vars.defaults.transition};
  padding: 0.625rem 1rem;
  background-color: ${getColorCarry('secondary3_v2')};

  &:last-child {
    margin-bottom: 0;
  }

  &.ci-item__active {
    filter: brightness(80%);
  }

  .ci-item {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;

    &__title {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('dark_v2')};
    }

    &__type {
      color: ${getColorCarry('primaryDark_v2')};
      font-weight: 500;
    }

    &__total {
      color: ${getColorCarry('primary_v2')};
      font-weight: 700;
    }
  }
`
