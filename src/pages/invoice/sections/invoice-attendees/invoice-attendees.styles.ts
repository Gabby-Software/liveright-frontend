import styled from 'styled-components'

export default styled.div`
  display: flex;
  overflow: hidden;
  .invoice-att {
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    @media only print {
      font-size: 80%;
    }
    &__send-btn {
      width: 100%;
    }
    color: ${(p) => p.theme.vars.colors.primaryDark};
    &__title {
      color: ${(p) => p.theme.vars.colors.primary};
    }
    &__name {
      font-weight: 600;
      font-size: 18px;
      margin: 17px 0 14px 0;
    }
    &__desc {
      max-width: 185px;
    }
    &__actions {
      .ant-btn-primary {
        border-radius: 4px;
        padding: 13px;
        width: 207px;
        margin-bottom: 16px;
      }
      @media only print {
        display: none;
      }
    }
    &__print {
      display: none;
      .ant-btn-primary {
        border-radius: 2px;
        padding: 8px;
      }
      @media only print {
        display: block;
      }
    }
    &__date {
      font-weight: 500;
      font-size: 14px;
      color: ${(p) => p.theme.vars.colors.secondary2};
      margin-top: 10px;
      text-style: italic;
      white-space: nowrap;
    }
    &__cta {
      border-color: ${(p) => p.theme.vars.colors.primaryDark};
      background-color: ${(p) => p.theme.vars.colors.primaryDark};
      &:hover {
        border-color: ${(p) => p.theme.vars.colors.primaryDark};
        background-color: ${(p) => p.theme.vars.colors.primaryDark};
        opacity: 0.8;
      }
    }
    &__icons {
      display: flex;
      justify-content: space-between;
      padding: 5px 14px;
    }
    &__action {
      display: block;
      height: 25px;
      width: auto;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      cursor: pointer;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &:hover {
        opacity: 0.8;
      }
      &__disabled {
        opacity: 0.6;
        cursor: not-allowed;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`
