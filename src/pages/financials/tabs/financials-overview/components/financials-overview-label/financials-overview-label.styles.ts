import styled from 'styled-components'

export default styled.div`
  font-weight: 500;
  padding: 48px 0;
  margin: 0 24px;
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.light2};
  &:last-child {
    border-bottom: none;
  }
  .f-overview-label {
    &__title {
      font-size: 18px;
      color: ${(p) => p.theme.vars.colors.secondary};
    }
    &__value {
      font-weight: 600;
      font-size: 32px;
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__currency {
      font-size: 18px;
      color: ${(p) => p.theme.vars.colors.success};
      filter: brightness(60%);
    }
  }
`
