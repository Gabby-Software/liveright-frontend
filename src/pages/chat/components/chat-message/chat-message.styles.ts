import styled from 'styled-components'

export default styled.div`
  display: flex;
  padding: 2px;
  .message {
    &__body {
      max-width: 500px;
      background-color: ${(p) => p.theme.vars.colors.chat_blue};
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      font-size: 14px;
      border-radius: 0 8px 8px 8px;
      margin: 10px 0;
      &.me {
        background-color: ${(p) => p.theme.vars.colors.chat_dark};
        color: white;
        border-radius: 8px 0 8px 8px;
        margin-left: auto;
      }
    }
  }
`
