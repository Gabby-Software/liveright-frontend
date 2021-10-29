import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
  margin-bottom: 38px;

  @media ${mediaQueries.MOBILE} {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
    background: ${getColorCarry('white')};
    border-radius: 12px;
    gap: 0;
    row-gap: 25px;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`

export const LinkItem = styled.li`
  background: #ffffff;
  width: calc(100% / 6);
  border-radius: 22px;
  list-style: none;
  transition: ${(p) => p.theme.vars.defaults.transition};

  @media ${mediaQueries.MOBILE} {
    background: transparent;
    width: calc(100% / 3);
    border-radius: 0;
  }

  .link {
    display: block;
    padding-top: 28px;
    padding-bottom: 31px;
    @media ${mediaQueries.MOBILE} {
      padding: 0;
    }
  }
  p {
    font-family: Circular Std;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: ${getColorCarry('primaryDark')};
    transition: ${(p) => p.theme.vars.defaults.transition};

    @media ${mediaQueries.MOBILE} {
      font-size: 12px;
      line-height: 16px;
    }
  }
  & .link .li-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: #d3f5ee;
    border-radius: 25px;
    margin-bottom: 28px;
    margin-right: auto;
    margin-left: auto;
    transition: ${(p) => p.theme.vars.defaults.transition};

    @media ${mediaQueries.MOBILE} {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      margin-bottom: 10px;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 38px;
        height: 38px;
        @media ${mediaQueries.MOBILE} {
          width: 28px;
          height: 28px;
        }

        path {
          stroke: #72a69b;
          transition: ${(p) => p.theme.vars.defaults.transition};
        }
      }
    }
  }
  &:hover {
    cursor: pointer;
    background: #125a62;

    p {
      color: #ffffff;
    }
    .link .li-icon-wrapper {
      background: #216a72;

      .icon svg path {
        stroke: #ffffff;
      }
    }
  }
`
