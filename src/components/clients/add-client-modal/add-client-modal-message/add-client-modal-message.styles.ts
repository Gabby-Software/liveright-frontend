import styled from 'styled-components'

export default styled.div`
  width: 100%;
  flex-shrink: 0;
  transition: ${(p) => p.theme.vars.defaults.transition};
  overflow: hidden;
  .ant-btn-primary {
    margin: 40px 0 16px 0;
  }
  .client-add__message {
    &__wrap {
      width: calc(100vw - 48px);
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
        width: 472px;
      }
    }
    &__desc {
      ${(p) => p.theme.extend.p1};
      color: ${(p) => p.theme.vars.colors.primaryDark};
      margin-bottom: 24px;
      span {
        color: ${(p) => p.theme.vars.colors.primary_v2};
      }
    }
  }
`
