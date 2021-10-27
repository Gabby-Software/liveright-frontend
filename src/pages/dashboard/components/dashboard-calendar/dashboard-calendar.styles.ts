import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  width: 100%;
  background: #ffffff;
  box-shadow: ${getShadow('secondary')};
  border-radius: 10px;

  @media ${mediaQueries.MOBILE} {
    width: 334px;
    height: 517px;
    border-radius: 12px;
    margin-bottom: 25px;
  }
`
