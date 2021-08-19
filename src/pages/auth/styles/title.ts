import styled from 'styled-components'

export default styled.div`
  .title {
    &__hr {
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
      width: 85%;
      max-width: 350px;
      margin: auto;
    }
    &__h1 {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-size: 1.5rem;
      font-weight: bold;
      margin: 27px 0 0 0;
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
        font-size: 36px;
      }
    }
    &__h2 {
      color: ${(p) => p.theme.vars.colors.labelLight};
      font-weight: 500;
      font-size: 18px;
      margin: 0 0 56px 0;
    }
  }
`
