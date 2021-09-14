import styled from 'styled-components'

export default styled.div`
  background-color: white;
  width: 330px;
  max-width: calc(100vw - 40px);
  padding: 28px 24px;
  border-radius: 0 0 8px 8px;
  display: flex;
  margin-top: 4px;
  .cm-invoice {
    &__left {
      flex: 1;
    }
    &__id {
      color: ${(p) => p.theme.vars.colors.primaryDark2_v2};
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      color: ${(p) => p.theme.vars.colors.secondary4_v2};
    }
    &__total {
      color: ${(p) => p.theme.vars.colors.green_90};
      margin-top: 20px;
    }
    &__amount {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
    }
    &__currency {
      font-size: 18px;
    }

    &__badge {
      width: 130px;
    }

    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__cta {
      width: 130px;
    }
  }
`
