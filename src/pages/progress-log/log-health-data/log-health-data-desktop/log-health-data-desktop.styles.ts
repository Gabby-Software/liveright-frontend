import { Space } from 'antd'
import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 64px;
`

export const PickersWrapper = styled(Space)`
  .ant-space-item {
    width: 250px;
  }
`

export const CardsWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  position: relative;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .text_input__cont {
    width: 100%;
  }

  & > * {
    margin-bottom: 22px;
  }
`
