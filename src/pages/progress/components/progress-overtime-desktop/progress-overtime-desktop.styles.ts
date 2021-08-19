import { Button } from 'antd'
import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export const Wrapper = styled.div``

export const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
`

export const SwitchViewButton = styled(Button)``

export const TableWrapper = styled(Card)<{ isMobile?: boolean }>`
  margin-bottom: 32px;

  .ant-tabs {
    height: 350px;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }
`
