import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'
import ButtonSubmit from '../../../../../components/forms/button-submit/button-submit.component'

export const SubmitButton = styled(ButtonSubmit)``
export const SubmitButtonWrapper = styled.div<{ top: number }>`
  max-width: 250px;
  margin: 0 0 auto 40px;
  top: ${({ top }) => top}px;
  z-index: 100;
  position: relative;
  transition: top 0.5s ease;
  ${media('tablet', 'max')`
        max-width: none;
        margin: 40px 0 0 0;
        top: 0;
  `}
`
