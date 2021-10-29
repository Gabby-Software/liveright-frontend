import styled from 'styled-components'

export default styled.div`
  counter-increment: create-section;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
  margin-bottom: 24px;
  .ci-view__item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;

    &__type {
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__total {
      color: ${(p) => p.theme.vars.colors.primary_v2};
    }
  }
`
