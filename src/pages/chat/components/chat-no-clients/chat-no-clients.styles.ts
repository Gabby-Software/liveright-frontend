import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export default styled(Card)`
  height: 270px;
  ${(p) => p.theme.extend.flexCenter}
  flex-direction: column;
  .chat-no-client {
    &__icon {
      width: 49px;
      height: 49px;
      color: #5e5e5e;
    }
    &__desc {
      margin: 14px 0 44px 0;
      color: #5e5e5e;
    }
    &__cta {
      font-size: 16px;
      border-radius: 10px;
      background-color: ${(p) => p.theme.vars.colors.primary_v2};
      color: white;
      padding: 11px 25px;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &:hover {
        background-color: ${(p) => p.theme.vars.colors.primaryDark};
        color: white;
      }
    }
  }
`
