import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
// import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const GoalsListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 290px;
  gap: 2.5rem;
  padding-top: 2rem;
  border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
  padding-bottom: 3rem;
  width: 100%;

  @media ${mediaQueries.TABLET} {
    grid-template-columns: 1fr;
  }
`

export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
`
