import styled from 'styled-components'

import Card from '../../../components/cards/card/card.component'
import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const ScheduleCard = styled(Card)`
  padding: 31px 28px 28px 28px;
  background-color: ${getColorCarry('neutral_10')};
  border: 1px solid ${getColorCarry('background_v2')};

  @media (${mediaQueries.MOBILE}) {
    padding: 1.5rem 1.25rem;
  }
`
