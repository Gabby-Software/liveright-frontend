import styled from 'styled-components'

export const SubmitLabel = styled.div`
   margin-left: auto;
   text-align: right;
   max-width: 300px;
   .ant-btn {
        max-width: 300px;
        padding:0;
        &:first-child {
            margin-bottom: 24px;
        }
        label {
            cursor: pointer;
            display block;
            padding: 15px 30px;
        }
   }
`
export default styled.div`
  [class$='wrapper'] {
    margin-bottom: 24px;
  }
  div,
  label {
    margin-top: 0;
  }
  .add-invoice {
    &__cont {
      counter-reset: create-section;
    }
    &__action {
      color: ${(p) => p.theme.vars.colors.primary_v2};
      font-weight: 500;
      margin: 0 0 24px 0;
    }
    &__add-item {
      max-width: 200px;
    }
    &__add-client {
      display: flex;
      align-items: center;
    }
    &__preview {
      margin-bottom: 40px;
    }
    &__label {
      font-weight: 600;
      font-size: 14px;
      padding: 12px 0 0px 0;
      display: block;
    }
    &__value {
      font-weight: 500;
      font-size: 14px;
      text-align: right;
      display: block;
      padding: 12px 0 0 0;
    }
    &__total {
      font-weight: 700;
      font-size: 14px;
      padding: 12px 0 0 0;
      display: block;
    }
    &__submit {
      max-width: 300px;
      display: block;
      margin-top: 24px;
      &__cont {
        margin-bottom: 100px;
      }
    }
  }
`
