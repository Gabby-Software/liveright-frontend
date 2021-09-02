import styled from 'styled-components'

export default styled.div`
  width: 368px;
  max-width: 100%;
  flex-shrink: 0;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px 0 0 0;
  box-shadow: 0px 0px 20px rgba(230, 236, 242, 0.54);
  .chat-rooms {
    &__container {
      margin-top: 20px;
      height: 100%;
      overflow: auto;
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
