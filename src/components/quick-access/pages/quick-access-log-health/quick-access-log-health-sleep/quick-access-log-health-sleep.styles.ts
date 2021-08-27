import styled from 'styled-components'

export default styled.div`
  .log-sleep {
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    &__duration {
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
      font-size: 12px;
      width: 100%;
      text-align: center;
      padding-top: 30px;
    }
  }
  .text_input {
    &__label {
      color: #404040;
    }
    &__input {
      height: 70px;
      width: 98px;
      font-size: 18px;
      text-align: center;
      display: flex;
      align-items: center;
      input {
        font-size: 18px;
        text-align: center;
      }
    }
  }
  .ant-picker {
  }
`
