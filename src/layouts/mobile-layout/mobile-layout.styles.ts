import styled from 'styled-components'

export default styled.div`
  .mobile-layout {
    &__main {
      display: block;
      ${(p) => p.theme.extend.layout}
      min-height: 100vh;
    }
    &__title {
      display: flex;
      align-items: center;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 24px 0;
      &__v2 {
        background-color: ${(p) => p.theme.vars.colors.primaryDark_v2};
        color: white;
        font-size: 22px;
        font-weight: 700;
        margin: -39px -20px 0 -20px;
        padding: 26px 20px;
      }
    }
  }
  &.mobile-layout {
    &__v2 {
      background-color: ${(p) => p.theme.vars.colors.background_v2};
    }
  }
`
