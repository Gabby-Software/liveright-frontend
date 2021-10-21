import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import IconButton from '../../../buttons/icon-button/icon-button.component'
import UserBadgeCard from '../../../cards/user-bardge-card/user-badge-card.component'

export const CloseBtn = styled(IconButton)`
  & svg {
    width: 20px;
    height: 20px;
    color: ${getColorCarry('secondary2_v2')};
  }
`

export const Styles = styled(UserBadgeCard)`
  margin-bottom: 1.25rem;
`
