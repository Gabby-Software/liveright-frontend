import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export default styled.div`
  .f-overview {
    &__range {
      max-width: 240px;
    }
    &__graph {
      max-width: 920px;
      margin: 40px 0;
      display: flex;
      padding: 24px;
      ${media('tablet', 'max')`
            display: block;
        `}
      &__left {
        width: 100%;
        padding-right: 24px;
        ${media('tablet', 'max')`
                padding-right:0;
            `}
      }
      &__right {
        flex-shrink: 0;
      }
      &__title {
        ${(p) => p.theme.extend.h1};
      }
      &__body {
        background-color: white;
        border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
        padding: 24px;
        margin-top: 24px;
      }
    }
  }
`
