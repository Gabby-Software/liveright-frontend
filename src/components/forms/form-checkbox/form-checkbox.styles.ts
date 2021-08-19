import styled from 'styled-components'

export default styled.label`
  ${(p) => p.theme.extend.flexCenter}
  .form-cbx {
    &__input {
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`
