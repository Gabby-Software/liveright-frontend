import { Button } from 'antd'
import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export const Wrapper = styled.div`
  max-width: 1200px;
`

export const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 16px;

  & > :first-child {
    margin-right: 8px;
  }

  .ant-btn-link {
    margin-left: auto;
  }
`

export const SwitchViewButton = styled(Button)``

export const TableWrapper = styled(Card)<{ isMobile?: boolean }>`
  margin-bottom: 32px;

  .ant-tabs {
    min-height: 350px;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }
`
