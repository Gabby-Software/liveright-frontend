import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export const Wrapper = styled.div`
  .select_input__wrapper {
    width: 250px;
  }
`

export const CardsWrapper = styled.div`
  margin-bottom: 32px;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  ${media('tablet', 'max')`
      flex-wrap: wrap;
  `}
`
