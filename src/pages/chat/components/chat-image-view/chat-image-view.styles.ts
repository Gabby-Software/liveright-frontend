import styled from 'styled-components'

export default styled.div`
  ${(p) => p.theme.extend.flexCenter}
  ${(p) => p.theme.extend.fixedCover}
  z-index: ${(p) => p.theme.vars.zIndex.modal};
  transition: ${(p) => p.theme.vars.defaults.transition};
  transition-delay: 0.1s;
  opacity: 0;
  pointer-events: none;
  touch-action: none;
  background-color: #000000cc;

  .chat-image-view {
    &__cont {
      position: relative;
    }
    &__times {
      position: absolute;
      width: 36px;
      height: 36px;
      top: -40px;
      right: -10px;
      color: white;
    }
    &__link {
      color: white;
      ${(p) => p.theme.extend.flexCenter}
      margin-top: 24px;
      svg {
        height: 8px;
        display: block;
        margin-left: 13px;
      }
    }
    &__img {
      display: block;
      max-width: 80vw;
      max-height: 80vh;
      border-radius: 10px;
    }
  }
  &.chat-image-view {
    &__open {
      opacity: 1;
      pointer-events: auto;
      touch-action: auto;
    }
  }
`
