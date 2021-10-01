import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Subtitle = styled.h4`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark2_v2')};

  @media ${mediaQueries.TABLET} {
  }
`
