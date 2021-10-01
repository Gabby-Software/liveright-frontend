import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'

const ListWrapper = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px 14px;

  @media ${mediaQueries.MOBILE} {
    grid-template-columns: 1fr;
    margin-top: 18px;
  }
`

export { ListWrapper }
