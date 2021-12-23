import styled from 'styled-components'

export default styled.div`
  display: flex;
  width: 100%;
  background-color: ${(p) => p.theme.vars.colors.background_v2};

  .layout {
    &__wrapper {
      width: calc(100% - 220px);
      max-width: calc(100% - 220px);
      height: 100%;
      min-height: 100%;

      //overflow: auto;
      padding: 0 128px 0 56px;

      @media only print {
        padding: 0 0 0 40px;
      }

      &.design-v {
        &__2 {
          padding: 0 35px;
          &.sessions__layout {
            padding: 0;
          }
          .mobile-back {
            color: ${(p) => p.theme.vars.colors.link};
            font-size: 14px;
            font-weight: 400;
            &__icon {
              height: 8px;
              width: auto;
            }
            & + .page-title {
              font-size: 18px;
              margin: 28px 0;
            }
          }
        }
      }

      & main {
        min-height: 100%;
      }
    }
  }
`
