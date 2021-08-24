import styled from 'styled-components'

export default styled.div`
  position: relative;
  .chat-add {
    &__options {
      position: absolute;
      display: flex;
      bottom: calc(100% + 24px);
      background-color: white;
      border-radius: 8px;
      padding: 14px;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      opacity: 0;
      pointer-events: none;
      touch-action: none;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &__open {
        pointer-events: auto;
        touch-action: auto;
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .chat-action {
        margin: 14px;
      }
    }
  }
`
