import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: auto;
`

export const DateButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  svg {
    width: 12px !important;
    height: 12px !important;
  }
`
