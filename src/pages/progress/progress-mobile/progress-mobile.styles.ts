import styled from 'styled-components'

import Button from '../../../components/buttons/button/button.component'

export const Wrapper = styled.div<any>`
  padding-top: ${(props) => (props.$client ? '1.25rem' : 0)};
`

export const HeaderAction = styled(Button)`
  & svg {
    margin-left: 1rem;
  }
`
