import styled from 'styled-components'

export default styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  .carousel {
    &__cont {
      display: flex;
    }
    &__wrapper {
      width: 100%;
      overflow: hidden;
    }
    &__action {
      position: absolute;
      z-index: 5;
      top: 0;
      bottom: 0;
      width: 40px;
      // background-color: #ffffff88;
      cursor: pointer;
      ${(p) => p.theme.extend.flexCenter}
      svg {
        height: 20px;
        width: auto;
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
    }
    &__left {
      left: 0;
    }
    &__right {
      right: 0;
    }
  }
`
