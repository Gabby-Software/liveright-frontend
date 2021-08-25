import styled from 'styled-components'

export default styled.div`
  width: 368px;
  max-width: 100%;
  flex-shrink: 0;
  padding: 22px 24px;
  // background-color: white;
  .chat-rooms {
    &__container {
      margin-top: 20px;
    }
  }
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    padding: 0;
    .chat-rooms {
      &__title {
        display: flex;
        font-size: 22px;
        margin: -2px -20px 0 -20px;
        padding: 20px;
        height: 100px;
        background-color: ${(p) => p.theme.vars.colors.primaryDark_v2};
        color: white;
      }
      &__head {
        position: sticky;
        top: 98px;
      }
    }
    .text_input__input {
      margin-top: -24px;
    }
  }
`
