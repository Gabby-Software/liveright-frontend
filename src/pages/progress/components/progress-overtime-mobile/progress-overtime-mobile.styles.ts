import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div``

export const FilterWrapper = styled.div`
  .select_input__wrapper {
    width: 100%;
  }
`

export const TableWrapper = styled.div`
  margin: 16px 0;

  .ant-tabs {
    svg {
      width: 18px;
      height: 18px;
    }
  }

  .tabs-label-wrapper {
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
`

export const SwitchViewButton = styled(Button)`
  margin-left: auto;
  margin-bottom: 8px;
  padding: 0;
`