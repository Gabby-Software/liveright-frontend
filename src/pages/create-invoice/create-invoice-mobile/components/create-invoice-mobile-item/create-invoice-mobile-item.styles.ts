import styled from 'styled-components'

import Card from '../../../../../components/card/card.style'

export default styled(Card)`
  margin-bottom: 12px;
  transition: ${(p) => p.theme.vars.defaults.transition};
  &.ci-item__active {
    filter: brightness(80%);
  }
  .ci-item {
    font-size: 14px;
    display: flex;
    font-weight: 500;

    &__type {
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__icon {
      width: 16px;
      color: ${(p) => p.theme.vars.colors.secondary3};
      margin-left: 12px;
    }
    &__total {
      color: ${(p) => p.theme.vars.colors.primary};
      margin-left: auto;
    }
  }
`
