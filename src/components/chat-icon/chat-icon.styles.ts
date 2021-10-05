import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

const wShrink = '12px'
const wGrow = '18px'

export default styled.div`
  display: flex;
  align-items: center;

  &:after {
    position: absolute;
    width: ${wShrink};
    height: ${wShrink};
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${(p) => p.theme.vars.defaults.transition};
    background-color: ${getColorCarry('primary_v2')};
    right: 1rem;
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

  @media ${mediaQueries.TABLET} {
    position: relative;

    &::after {
      top: -5px;
      right: 0;
    }
  }
`
