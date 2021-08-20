import styled from 'styled-components'

import Card from '../../../../../components/card/card.style'
import { QualityType } from '../../../../progress/progress.types'

export const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 16px 32px;
  color: ${({ theme }) => theme.vars.colors.primaryDark};

  div:first-child {
    display: flex;
    align-items: center;

    .text_input__input {
      width: 200px;
      margin-right: 16px;
    }
  }
`

export const LogName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;

  & > * {
    margin-right: 8px;
  }

  & > span {
    ${({ theme }) => theme.extend.h3};
  }

  svg:first-child {
    width: 24px;
    height: 24px;
  }

  svg:last-child {
    width: 14px;
    height: 14px;
    margin-top: 2px;
  }
`

const qualityColors: { [key: string]: string } = {
  low: 'error',
  average: 'warning',
  good: 'success',
  high: 'error'
}

export const LogQuality = styled.div<{
  quality?: QualityType | ''
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;

  span:first-child {
    ${({ theme }) => theme.extend.label};

    svg {
      width: 14px;
      height: 14px;
      margin-bottom: -2px;
      margin-left: 4px;
    }
  }

  span:last-child {
    margin-top: 8px;
    color: ${({ quality, theme }) =>
      theme.vars.colors[qualityColors[quality || 'error']]};
    ${({ theme }) => theme.extend.h3};
  }
`

export const EditByInfo = styled.div`
  margin: 8px 0;
  font-style: italic;
`
