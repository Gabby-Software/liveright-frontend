import styled from 'styled-components'

export default styled.div`
  .split {
    &__card {
      margin-bottom: 12px;
      display: block;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      box-shadow: 1px 2px 3px ${(p) => p.theme.vars.colors.secondary}88;
      display: flex;
      justify-content: space-between;
      ${(p) => p.theme.extend.p1}
    }
    &__name {
      ${(p) => p.theme.extend.p1};
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__date {
      ${(p) => p.theme.extend.p2};
      color: ${(p) => p.theme.vars.colors.secondary};
    }
    &__status {
      margin-bottom: auto;
      ${(p) => p.theme.extend.small}
      color:white;
      padding: 4px 8px;
      border-radius: 4px;
      &__active {
        background-color: ${(p) => p.theme.vars.colors.error};
      }
      &__inactive {
        background-color: ${(p) => p.theme.vars.colors.success};
      }
      &__pending {
        background-color: ${(p) => p.theme.vars.colors.warning};
      }
    }
  }
`
