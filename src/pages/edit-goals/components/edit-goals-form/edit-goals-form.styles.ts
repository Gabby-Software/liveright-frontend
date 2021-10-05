import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
// import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const GoalsListWrapper = styled.div`
  display: flex;
  margin-top: 35px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 41px;
  width: 100%;

  @media ${mediaQueries.MOBILE} {
    flex-direction: column;
  }
`

export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
`
