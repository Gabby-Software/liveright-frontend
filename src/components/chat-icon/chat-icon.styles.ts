import styled from 'styled-components'

import { media } from '../../assets/styles/_media'

const wShrink = '10px'
const wGrow = '16px'
export default styled.div`
  ${(p) => p.theme.extend.flexCenter}
  &:after {
    position: absolute;
    top: -5px;
    right: -5px;
    ${(p) => p.theme.extend.flexCenter}
    width: ${wShrink};
    height: ${wShrink};
    color: white;
    font-size: 8px;
    border-radius: 50%;
    border: 1px solid white;
    box-shadow: 0 0 3px white;
    cursor: pointer;
    transition: ${(p) => p.theme.vars.defaults.transition};
    background-color: ${(p) => p.theme.vars.colors.primary};
    ${media('tablet', 'min')`
        top:0;
        bottom:0;
        right:0;
        margin:auto;
    `}
  }
  &.notification {
    &__active {
      &:after {
        width: ${wGrow};
        height: ${wGrow};
        content: attr(data-count);
      }
    }
  }
`
