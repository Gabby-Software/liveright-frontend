import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export default styled(Card)`
  margin-bottom: 60px;
  position: relative;
  .ci-item {
    &__total {
      font-weight: 600;
      font-size: 14px;
    }
    &__remove {
      color: ${(p) => p.theme.vars.colors.error};
      position: absolute;
      right: 0;
      padding: 20px 0 20px 20px;
      cursor: pointer;
    }
  }
`
