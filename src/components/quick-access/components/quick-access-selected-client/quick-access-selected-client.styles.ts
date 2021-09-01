import styled from 'styled-components'

import Card from '../../../card/card.style'

export default styled(Card)`
  display: flex;
  align-items: center;
  margin: 10px 0;
  position: relative;
  .profile-image__img {
    width: 39px;
    height: 39px;
    font-size: 14px;
  }
  .qa-client {
    &__data {
      margin: 0 auto 0 11px;
    }
    &__name {
      font-weight: 700;
      font-size: 14px;
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    }
    &__email {
      font-size: 12px;
      font-weight: 400;
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
    }

    &__action {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 17px;
      top: 0;
      bottom: 0;
      margin: auto;
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
    }
  }
`
