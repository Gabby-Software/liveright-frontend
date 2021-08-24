import styled from 'styled-components'

import Card from '../../../../../components/card/card.style'
import { QualityType } from '../../../../progress/progress.types'

export const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 16px 32px;
  color: ${({ theme }) => theme.vars.colors.primaryDark};
  background-color: white;

  div:first-child {
    display: flex;
    align-items: center;
  }
  .text_input__wrapper {
    width: 100%;
  }
`
export const Space = styled.div`
  margin: auto;
`
export const Border = styled.div`
  margin: 0px 30px;
  border-right: 1px solid #f1f4f7;
  flex-shrink: 0;
  align-self: stretch;
`

export const LogName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 250px;
  flex-shrink: 0;
  align-self: stretch;

  & > span {
    font-weight: 500;
    font-size: 14;
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

// const qualityColors: { [key: string]: string } = {
//   low: 'error',
//   average: 'warning',
//   good: 'success',
//   high: 'error'
// }

export const LogQuality = styled.div<{
  quality?: QualityType | ''
}>`
  display: flex;
  width: 200px;
  flex-shrink: 0;
  align-self: stretch;

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
    align-items: left;
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
