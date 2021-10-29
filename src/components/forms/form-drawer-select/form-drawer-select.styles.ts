import styled from 'styled-components'

export default styled.div`
  .drawer-select {
    &__cont {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    &__option {
      width: calc(33.33% - 8px);
      margin-right: 12px;
      margin-bottom: 12px;
      ${(p) => p.theme.extend.flexCenter}
      ${(p) => p.theme.extend.p2}
        padding: 8px;
      border: 1px solid ${(p) => p.theme.vars.colors.secondary};
      color: ${(p) => p.theme.vars.colors.secondary};
      transition: ${(p) => p.theme.vars.defaults.transition};
      text-align: center;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &__active {
        border: 1px solid ${(p) => p.theme.vars.colors.primary_v2};
        background-color: ${(p) => p.theme.vars.colors.primary_v2};
        color: white;
      }
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      text-align: left;
    }
  }
`
