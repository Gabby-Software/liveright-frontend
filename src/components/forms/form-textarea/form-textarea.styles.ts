import styled from 'styled-components'

export default styled.div`
  .text_input {
    &__cont {
      position: relative;
      display: block;
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
      resize: none;
      display: block;
      background-color: #fbfbfb;
      border: 1px solid #c4c4c4;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      padding: 14px 16px;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        border-color: ${(p) => p.theme.vars.colors.inputBorder};
      }
    }
  }
`
