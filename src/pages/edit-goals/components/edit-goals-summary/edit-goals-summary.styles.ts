import styled from 'styled-components'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SummaryWrapper = styled(Card)`
  width: 100%;
  margin-bottom: 1.25rem;

  @media ${mediaQueries.MOBILE} {
    width: 100%;
  }
`
export const SummaryHead = styled.h2`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #2e2f31;
  margin-bottom: 23px;
`
export const SummaryTotal = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.187;
  padding-bottom: 37px;
  border-bottom: 1px solid #ededed;
  margin-bottom: 34px;
`

export const SummaryTargetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  //   margin-top: 34px;
  &:last-child {
    margin-top: 19px;
  }
`
export const SummaryTargetText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: ${getColorCarry('primaryDark_v2')};
`

export const SummaryTargetValue = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: ${getColorCarry('primaryDark_v2')};
`
export const ButtonText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5rem;
  color: ${getColorCarry('white')};

  @media ${mediaQueries.TABLET} {
    padding: 0 21px;
  }
`

export const SummaryButton = styled(Button)`
  width: 100%;
`
