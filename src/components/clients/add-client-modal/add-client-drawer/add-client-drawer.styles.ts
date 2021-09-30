import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

const AddClientDrawerStyles = styled.div<any>`
  background-color: white;
  border-radius: 10px;
  min-height: 100%;
  form {
    margin: 0 3px;
  }
  .add-client-drawer {
    &__mask {
      overflow: hidden;
    }
    &__content {
      padding: 30px;
    }
    &__body {
      display: flex;
      position: relative;
      transition: ${(p) => p.theme.vars.defaults.transition};
      height: 100%;
    }
  }

  .client-add__message__wrap {
    width: 100% !important;
  }

  .text_input__label {
    color: ${getColorCarry('secondary2_v2')} !important;
    font-weight: normal !important;
  }
  .client-add__input {
    margin-bottom: 22px;
    .text_input__input,
    .input__input {
    }
  }

  .client-add__submit {
    padding-top: 13px;
    padding-bottom: 13px;
    margin-top: 30px;
    font-size: 18px;
    width: 100%;
  }

  @media ${mediaQueries.LANDSCAPE} {
    .client-add__message__wrap {
      width: 100% !important;
    }
  }

  @media ${mediaQueries.TABLET} {
    width: 100%;
    position: absolute;
    left: 0;
    min-height: calc(100% - 9.4rem);

    .ant-btn-default {
      display: none;
    }
  }
`
export default AddClientDrawerStyles
