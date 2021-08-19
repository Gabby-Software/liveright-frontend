import PhoneInput from 'react-phone-number-input'
import styled from 'styled-components'

export default styled.div`
  .text_input {
    &__cont {
      position: relative;
      display: block;
    }
    &__content {
      position: relative;
      svg {
        width: 18px;
        height: auto;
        display: block;
        margin: auto 0;
      }
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      text-align: left;
    }
    &__input {
      display: block;
      padding: 14px 16px;
      background-color: #fbfbfb;
      border: 1px solid #c4c4c4;
      color: ${(p) => p.theme.vars.colors.dark};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        border-color: black;
        & + svg + svg.text_input__error {
          display: none;
        }
        & ~ svg:not(.text_input__error) {
          display: block;
        }
      }
    }
  }

  &.text_input {
    &__error {
      .text_input {
        &__input {
          border-color: ${(p) => p.theme.vars.colors.error};
          padding-right: 40px;
          &:not(:focus) + svg {
            opacity: 0;
          }
        }
      }
      svg {
        color: ${(p) => p.theme.vars.colors.error};
      }
    }
    &__icon {
      .text_input {
        &__input {
          padding-right: 40px;
        }
      }
    }
  }
`
export const PhoneInputStyles = styled(PhoneInput)`
  position: relative;
  display: flex !important;

  &.PhoneInput--focus {
  }
  .PhoneInputCountry {
    ${(p) => p.theme.extend.flexCenter}
    margin-right: 10px;
    position: relative;
  }
  .PhoneInputCountryIconImg {
    width: 18px;
    height: auto;
    object-fit: contain;
  }
  .PhoneInputCountrySelect {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    border: 0;
    opacity: 0;
    cursor: pointer;
  }
  .PhoneInputCountryIconImg {
  }
  input {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    background-color: #fbfbfb;
    width: 100%;
  }
`
