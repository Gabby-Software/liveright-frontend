import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Wrapper = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  margin-bottom: 1.25rem;
  color: ${getColorCarry('primaryDark_v2')};

  .log-card {
    &__name {
      align-items: center;
      display: flex;
    }

    &__control {
      padding: 0 1.875rem;
      border-left: 1px solid ${getColorCarry('inputBorder_v2')};
      border-right: 1px solid ${getColorCarry('inputBorder_v2')};
    }

    &__quality {
    }
  }
`

export const LogName = styled.div`
  padding-right: 1.875rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;

  & > span {
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0 11px;
  }

  svg:first-child {
    width: 30px;
    height: 30px;
  }

  svg:not(:first-child) {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    display: block;
    color: ${(p) => p.theme.vars.colors.secondary2_v2};
    margin-top: 2px;
  }
`

export const LogQuality = styled.div<any>`
  padding-left: 1.875rem;
  display: flex;

  span {
    display: block;
  }
  span.log-quality-label {
    ${({ theme }) => theme.extend.label};
    ${(p) => p.theme.extend.flexCenter}

    svg {
      width: 14px;
      height: 14px;
      display: block;
      margin-left: 10px;
    }
  }

  span.log-quality-value {
    margin-top: 16px;
    display: block;
    color: ${({ theme }) => theme.vars.colors.primaryDark};
    // color: $ {({ quality, theme }) =>
    //   theme.vars.colors[qualityColors[quality || 'error']]};
    // $ {({ theme }) => theme.extend.h3};
  }
`

export const EditByInfo = styled.div`
  margin: 8px 0;
  font-style: italic;
`
