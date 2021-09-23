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
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5rem;
      color: ${(p) => p.theme.vars.colors.neutral_100};
    }
    &__label {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${(p) => p.theme.vars.colors.neutral_70};
      margin-top: 1rem;
    }
    &__filter-wrapper {
      padding-top: 1.5rem;
      padding-bottom: 1.25rem;
    }
    &__filter-wrapper {
      padding-top: 1.5rem;
      padding-bottom: 1.25rem;
    }
  }
`
