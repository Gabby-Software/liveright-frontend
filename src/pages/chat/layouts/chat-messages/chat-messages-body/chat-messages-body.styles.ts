import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'

export default styled.div`
  height: 100%;
  overflow: auto;
  background-color: #f7f9fc;
  padding: 26px 34px;
  position: relative;
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    background-color: ${(p) => p.theme.vars.colors.background_v2};
    padding: 0;
    margin: -30px 0;
    height: auto;
    overflow: visible;
  }
  &.popup {
    padding: 26px 18px;
    margin-top: -30px;
  }
  .chat-typing {
    margin: 24px 0 8px 0;
    color: ${(p) => p.theme.vars.colors.secondary2_v2};
    ${media('tablet', 'max')`
        position: absolute;
    `}
  }
`
