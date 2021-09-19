import { TimePicker } from 'antd'
import styled from 'styled-components'

import { ReactComponent as InfoIcon } from '../../../../assets/media/icons/info-fill.svg'
import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled.div`
  .log-health {
    &__submit {
      width: 100%;
    }

    &__form-item {
      margin-bottom: 0.75rem;
    }
  }
`

export const WhiteCard = styled(Card)`
  margin-bottom: 1.25rem;
`

export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  color: ${getColorCarry('primaryDark_v2')};
  border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};

  svg:first-child {
    width: 32px;
    height: 32px;
  }

  span {
    padding: 0 10px 0 14px;
  }
`

export const GrayStyledTimeInput = styled(TimePicker)`
  border-radius: 10px;
  background-color: ${getColorCarry('secondary3_v2')};
  ${(p) => p.theme.extend.flexCenter}
  border: none;
  outline: none;
  appearance: none;
  text-align: center;
  padding: 0.875rem;
  font-size: 1.125rem;
  width: 100px;
  height: 70px;

  input {
    font-size: 1.125rem;
    text-align: center;
  }
`

export const GrayStyledInput = styled.input`
  width: 100px;
  height: 70px;
  border-radius: 10px;
  background-color: ${getColorCarry('secondary3_v2')};
  ${(p) => p.theme.extend.flexCenter}
  border: none;
  outline: none;
  appearance: none;
  text-align: center;
  padding: 0.875rem;
  font-size: 1.125rem;
`

export const Info = styled(InfoIcon)`
  display: block;
  width: 14px;
  height: 14px;
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
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
