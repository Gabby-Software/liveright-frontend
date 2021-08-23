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
    }
  }
  &.mobile-layout {
    &__v2 {
      background-color: ${(p) => p.theme.vars.colors.background_v2};
    }
  }
`
