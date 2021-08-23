import { Button } from 'antd'
import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const LogCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  .sleep-data {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    ${({ theme }) => theme.extend.p1};

    span:first-child {
      margin-bottom: 8px;
    }
  }

  .data {
    margin: 8px 0;
    ${({ theme }) => theme.extend.h3};
  }
`

export const Quality = styled.span`
  position: absolute;
  top: 16px;
  right: 8px;
  ${({ theme }) => theme.extend.h2}
`

export const DateButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  ${({ theme }) => theme.extend.p1}

  svg {
    margin-right: 4px;
    width: 12px !important;
    height: 12px !important;
  }
`
