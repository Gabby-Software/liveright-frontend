import { Space } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 64px;
`

export const PickersWrapper = styled(Space)`
  margin-bottom: 16px;

  .ant-space-item {
    width: 250px;
  }
`
