import styled from 'styled-components'

import Button from '../../../../components/buttons/button/button.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Summary = styled.div`
  margin-left: 41px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediaQueries.MOBILE} {
    margin-left: 0;
    margin-top: 22px;
  }
`

export const SummaryWrapper = styled.div`
  width: 291px;
  height: 274px;
  border-radius: 10px;
  background: ${getColorCarry('white')};
  margin-bottom: 23px;
  padding: 28px 26px 30px 29px;

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
  color: #2e2f31;
`

export const SummaryTargetValue = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #2e2f31;
`
export const ButtonText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5rem;
  color: ${getColorCarry('white')};

  @media ${mediaQueries.MOBILE} {
    padding: 0 21px;
  }
`

export const SummaryButton = styled(Button)`
  width: 100%;
`
