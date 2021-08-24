import styled from 'styled-components'

export default styled.div`
  .ant-picker-suffix {
    color: ${(p) => p.theme.vars.colors.dark2};
  }
  .text_input {
    &__cont {
      position: relative;
      display: block;
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 8px;
      text-align: left;
    }
    &__input {
      outline: none;
      box-shadow: none;
      display: block;
      background-color: white;
      border: 1px solid #e0e0e0;
      padding: 14px 16px;
      color: ${(p) => p.theme.vars.colors.dark};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      &:focus,
      &.ant-picker-focused {
        border-color: ${(p) => p.theme.vars.colors.inputBorder};
      }
    }
    &__error {
      border-color: ${(p) => p.theme.vars.colors.error};
      svg {
        color: ${(p) => p.theme.vars.colors.error};
      }
    }
  }
`
