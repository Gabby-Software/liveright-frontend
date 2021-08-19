import styled from 'styled-components'

import { media } from '../../assets/styles/_media'

export default styled.div`
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    display: flex;
  }
  .profile {
    &__main {
      width: 100%;
      max-width: 1080px;
    }
  }
  [class$='input__wrapper'],
  .radio__wrapper,
  .textarea__wrapper,
  .text_input__wrapper {
    margin-bottom: 24px;
  }
  ${media('tablet', 'min')`
    .row {
    >div {
        width:33%;
        margin-right: 14px;
        margin-top: auto;       
        &:last-child {
            margin-right: 0;
        }
    }
    }
    .profile {
        &__main {
            margin-bottom: 100px;
        }
    }
`}\`;
`
