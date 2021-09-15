import styled from 'styled-components'

export default styled.div`
  .clients {
    &__heading {
      background-color: white;
      padding: 1.75rem 1.25rem;
      border-radius: 0.75rem;
    }
    &__card {
      margin-bottom: 12px;
      box-shadow: 1px 2px 3px ${(p) => p.theme.vars.colors.secondary}88;
    }
    &__name {
      ${(p) => p.theme.extend.p1}
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__label {
      ${(p) => p.theme.extend.p1}
      color: ${(p) => p.theme.vars.colors.secondary};
      margin-top: 4px;
    }
    &__filter-wrapper {
      padding-top: 1.5rem;
      padding-bottom: 1.25rem;
    }
  }
`
