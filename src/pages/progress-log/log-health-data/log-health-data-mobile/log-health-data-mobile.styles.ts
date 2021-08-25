import { TimePicker } from 'antd'
import styled from 'styled-components'

import { ReactComponent as InfoIcon } from '../../../../assets/media/icons/info-fill.svg'

export const Wrapper = styled.div`
  margin-bottom: 64px;
`
export const WhiteCard = styled.div`
  background-color: white;
  margin: 20px 0;
  padding: 22px 20px;
  border-radius: 10px;
  .text_input__wrapper:first-child {
    margin-bottom: 12px;
  }
  .select_input__wrapper {
    margin-top: 20px;
  }
`
export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 20px;
  margin-bottom: 20px;
  color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.inputBorder_v2};
  svg:first-child {
    width: 40px;
    height: 40px;
    display: block;
  }
  span {
    padding: 0 10px 0 14px;
  }
`
export const GrayStyledTimeInput = styled(TimePicker)`
  border-radius: 10px;
  background-color: ${(p) => p.theme.vars.colors.secondary3_v2};
  ${(p) => p.theme.extend.flexCenter}
  border: none;
  outline: none;
  appearance: none;
  text-align: center;
  padding: 14px;
  font-size: 18px;
  width: 100px;
  height: 70px;
  input {
    font-size: 18px;
    text-align: center;
  }
`
export const GrayStyledInput = styled.input`
  width: 100px;
  height: 70px;
  border-radius: 10px;
  background-color: ${(p) => p.theme.vars.colors.secondary3_v2};
  ${(p) => p.theme.extend.flexCenter}
  border: none;
  outline: none;
  appearance: none;
  text-align: center;
  padding: 14px;
  font-size: 18px;
`
export const Info = styled(InfoIcon)`
  display: block;
  width: 14px;
  height: 14px;
`
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:first-child) {
    margin-top: 20px;
  }
  .log-health {
    &__label {
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
      margin-bottom: 8px;
    }
    &__value {
      width: 100px;
      height: 70px;
      display: flex;
      align-items: center;
      &__cont {
        flex-shrink: 2;
      }
    }
    &__result {
      ${(p) => p.theme.extend.flexCenter}
      width: 75px;
      margin: 25px auto 0 auto;
      height: 70px;
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
      position: relative;
      span {
        background-color: white;
        padding: 4px;
        position: relative;
        z-index: 1;
      }
      &:before {
        ${(p) => p.theme.extend.pseudo}
        top: 50%;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ededed;
      }
    }
  }
`
