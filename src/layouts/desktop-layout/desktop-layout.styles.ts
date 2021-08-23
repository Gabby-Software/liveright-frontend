import styled from 'styled-components'

export default styled.div`
  display: flex;
  width: 100%;

  .layout {
    &__wrapper {
      width: calc(100% - 56px);
      @media all and (max-height: 800px) {
        width: calc(100% - 46px);
      }
      overflow: auto;
      padding: 0 128px 0 56px;
      @media only print {
        padding: 0 0 0 40px;
      }

      &.design-v {
        &__2 {
          background-color: ${(p) => p.theme.vars.colors.background_v2};
          padding: 0 35px;

          &.sessions__layout {
            padding: 0;
          }
        }
      }
    }
  }
`
