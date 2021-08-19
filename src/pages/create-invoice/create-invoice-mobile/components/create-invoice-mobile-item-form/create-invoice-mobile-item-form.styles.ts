import styled from 'styled-components'

export default styled.div`
  margin-bottom: 60px;
  position: relative;
  .ci-item {
    &__total {
      font-weight: 600;
      font-size: 14px;
      text-align: right;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      &__value {
        color: ${(p) => p.theme.vars.colors.primary};
        padding-left: 12px;
      }
    }
    &__remove {
      color: ${(p) => p.theme.vars.colors.error};
      position: absolute;
      right: 0;
      padding: 20px 0 20px 20px;
      cursor: pointer;
    }
    &__row {
      display: flex;
      div {
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`
