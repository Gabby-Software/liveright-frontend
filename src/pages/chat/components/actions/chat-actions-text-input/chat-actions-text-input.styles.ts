import styled from 'styled-components'

export default styled.label`
  display: flex;
  width: 100%;
  padding: 12px 18px;
  background-color: ${(p) => p.theme.vars.colors.background_v2};
  border-radius: 8px;
  .chat-input {
    &__input {
      padding: 0;
      display: block;
      width: 100%;
      background: none;
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      line-height: 20px;
      font-size: 14px;
      border: none;
      outline: none;
      &:placeholder {
        color: ${(p) => p.theme.vars.colors.secondary5_v2};
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
`
