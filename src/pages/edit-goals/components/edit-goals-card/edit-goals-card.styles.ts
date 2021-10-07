import { Field } from 'formik'
import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const GoalsCardWrapper = styled.div`
  display: flex;
  background-color: ${getColorCarry('white')};
  border-radius: 10px;
  padding: 19px 46px 19px 35px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  height: 122px;
  justify-content: space-between;

  @media ${mediaQueries.MOBILE} {
    height: 100%;
    flex-direction: column;
    padding: 22px 22px 22px 22px;
  }
`

export const GoalsCardTitle = styled.div`
  font-weight: 500;
  & svg {
    color: #000000;
    margin-right: 19px;
    width: 30px;
    height: 28px;
  }
  display: flex;
  align-items: flex-start;
  min-width: 213px;
  font-size: 16px;
  line-height: 1.5;

  @media ${mediaQueries.MOBILE} {
  }
`

export const GoalsCardTitleWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const GoalsWrapContent = styled.div`
  display: flex;

  @media ${mediaQueries.MOBILE} {
    flex-direction: column;
    padding-top: 17px;
    border-top: 1px solid #f1f4f7;
    margin-top: 17px;
  }
`

export const GoalsCardAverageInputWrap = styled.div`
  border-left: 1px solid #f1f4f7;
  display: flex;
  padding: 0 44px;

  @media ${mediaQueries.MOBILE} {
    border: none;
    padding: 0;
    margin-bottom: 22px;
  }
`
export const GoalsCardAverageInputText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: #9e9e9e;
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-right: 24px;
  }
`
export const GoalsCardAverageInput = styled(Field)`
  padding: 13px 16px;
  color: darkgrey;
  background: ${getColorCarry('white')};
  border: 1px solid #9e9e9e;
  border-radius: 10px;
  width: 136px;
  height: 46px;
  outline: none;
  @media ${mediaQueries.MOBILE} {
    width: 100%;
    margin-top: 6px;
  }
`
export const GoalsCardRevenueInputWrap = styled.div`
  border-left: 1px solid #f1f4f7;

  display: flex;
  padding-left: 44px;
  @media ${mediaQueries.MOBILE} {
    border: none;
    padding: 0;
    width: 100%;
    padding-bottom: 8px;
  }
`

export const GoalsCardRevenueInputText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: #9e9e9e;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const GoalsCardRevenueInput = styled(Field)`
  padding: 13px 16px;
  color: darkgrey;
  background: ${getColorCarry('white')};
  border: 1px solid #9e9e9e;
  border-radius: 10px;
  width: 136px;
  height: 46px;
  outline: none;
  @media ${mediaQueries.MOBILE} {
    width: 100%;
    margin-top: 6px;
  }
`

export const GoalsCardFieldWrapper = styled.div`
  input {
    padding: 13px 16px;
    color: darkgrey;
    background: ${getColorCarry('white')};

    border-radius: 10px;
    height: 46px;
    outline: none;
    border: 1px solid #9e9e9e;
  }
`

export const GoalsCardOtherInputWrap = styled.div`
  border-left: 1px solid #f1f4f7;

  display: flex;
  padding-left: 44px;

  @media ${mediaQueries.MOBILE} {
    border-left: none;
    border-top: 1px solid #f1f4f7;
    padding: 22px 0 8px 0;
    padding-left: 0;
    padding-bottom: 8px;
    margin-top: 22px;
    width: 100%;
  }
`
export const GoalsCardOterInputText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428;
  color: #9e9e9e;
  display: flex;
  flex-direction: column;

  @media ${mediaQueries.MOBILE} {
    width: 100%;
  }
`
