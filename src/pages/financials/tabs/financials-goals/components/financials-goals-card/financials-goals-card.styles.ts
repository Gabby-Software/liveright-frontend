import styled from 'styled-components'

// import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

const Wrapper = styled.div`
  position: relative;
  box-shadow: 0px 0px 30px rgba(230, 45, 71, 0.03);
  border-radius: 12px;
  background-color: ${getColorCarry('primaryDark_v2')};
  padding: 19px 18px 19px 20px;
`
const Title = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: ${getColorCarry('white')};
  opacity: 0.8;
  margin-bottom: 8px;
`

const PriceWrapper = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.187;
  color: ${getColorCarry('white')};
  display: flex;
  align-items: baseline;
  padding-bottom: 21px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.05);
  margin-bottom: 18px;
`

const PriceText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: ${getColorCarry('white')};
  margin-left: 8px;
`
const CurrentWrapper = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: ${getColorCarry('neutral_50')};
`

const CurrentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: ${getColorCarry('neutral_50')};
  margin-left: 14px;
`

const Icon = styled.div`
  position: absolute;
  top: 21px;
  right: 18px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: ${getColorCarry('chat_dark')};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  & svg {
    color: ${getColorCarry('white')};
  }
`

export {
  Wrapper,
  Title,
  PriceText,
  PriceWrapper,
  CurrentWrapper,
  CurrentText,
  Icon
}
