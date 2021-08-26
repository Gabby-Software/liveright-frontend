import { Space } from 'antd'
import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export const Wrapper = styled.div`
  .select_input__wrapper {
    width: 250px;
  }
`

export const CardsWrapper = styled(Space)`
  margin-bottom: 32px;
  padding: 8px 0;
  justify-content: space-between;
  ${media('tablet', 'max')`
      flex-wrap: wrap;
  `}
`
