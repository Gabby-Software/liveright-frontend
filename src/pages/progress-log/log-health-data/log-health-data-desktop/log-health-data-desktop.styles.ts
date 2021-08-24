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
  margin: 32px 0;

  .ant-space-item {
    width: 250px;
  }
`

export const CardsWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  position: relative;
`

export const SubmitButtonWrapper = styled.div`
  max-width: 250px;
  margin: 0 0 auto 40px;
  ${media('tablet', 'max')`
        max-width: none;
        margin: 40px 0 0 0;
  `}
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
  width: 100%;
  .text_input__cont {
    width: 100%;
  }

  & > * {
    margin-bottom: 22px;
  }
`
