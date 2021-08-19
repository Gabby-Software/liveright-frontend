import styled from 'styled-components'

export default styled.div`
  .radio {
    display: flex;
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      text-align: left;
    }
    &__cont {
    }
    &__button {
      width: 100%;
      ${(p) => p.theme.extend.flexCenter}
      justify-content:flex-start;
      margin-right: 1rem;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      border: 1px solid ${(p) => p.theme.vars.colors.inputBorder};
      color: ${(p) => p.theme.vars.colors.inputBorder};
      font-weight: 500;
      font-size: 14px;
      padding: 13px 12px;
      transition: ${(p) => p.theme.vars.defaults.transition};
      cursor: pointer;
      ${(p) => p.theme.extend.radioCircle}
      &:last-child {
        margin-right: 0;
      }
      &__active {
        color: ${(p) => p.theme.vars.colors.primaryDark};
        background-color: ${(p) => p.theme.vars.colors.card};
        border-color: ${(p) => p.theme.vars.colors.card};
      }
    }
  }
`
