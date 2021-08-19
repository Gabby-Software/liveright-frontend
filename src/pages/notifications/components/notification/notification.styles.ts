import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import Card from '../../../../components/card/card.style'

export default styled(Card)`
  ${(p) => p.theme.extend.flexCenter}
  margin-bottom: 16px;
  .notification {
    &__icon {
      ${(p) => p.theme.mixin.circleImage('36px')}
      color: white;
      background-color: #4f6cde;
      padding: 6px;
      flex-shrink: 0;
      &__info {
        background-color: #4f6cde;
      }
      &__invoice {
        background-color: #44c7ff;
      }
      &__session {
        background-color: #ffde34;
      }
    }
    &__data {
      width: 100%;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-weight: 500;
      margin: 0 12px;
      ${media('tablet', 'min')`
            display: flex;
            justify-content: space-between;
            margin: 0 16px;
        `}
    }
    &__content {
      font-size: 16px;
    }
    &__datetime {
      font-weight: 14px;
    }
    &__link {
      &__icon {
      }
    }
    &__action {
      margin: 0 48px;
      button {
        min-width: 160px;
        padding: 9px 30px;
      }
    }
    &__eye {
      width: 21px;
      height: auto;
      margin-right: 10px;
    }
  }
`
