import { Button, Space } from 'antd'
import styled from 'styled-components'

import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 64px;
`

export const ReturnButton = styled(Button)`
  display: flex;
  flex: 1;
  align-items: center;
  width: fit-content;
  padding: 0;

  svg {
    margin-right: 8px;
  }
`

export const PickersWrapper = styled(Space)`
  margin: 32px 0;

  .ant-space-item {
    width: 250px;
  }
`

export const CardsWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  position: relative;
`

export const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: -150px;
  top: 0;
`

export const SubmitButton = styled(ButtonSubmit)`
  z-index: 100;
  position: sticky;
  position: -webkit-sticky;
  top: 10px;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 8px;
  }

  &:last-child {
    width: 425px;
  }
`
