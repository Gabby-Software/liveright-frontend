import styled from 'styled-components'

export default styled.div`
  margin-top: 80px;
  height: calc(100vh - 128px);
  display: flex;
  flex-direction: column;
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    max-height: 540px;
  }
  .add-client {
    &__title {
      ${(p) => p.theme.extend.h1}
      color: ${(p) => p.theme.vars.colors.primaryDark};
      margin-bottom: 40px;
    }
    &__body {
      display: flex;
      position: relative;
      transition: ${(p) => p.theme.vars.defaults.transition};
      height: 100%;
    }
    &__cont {
      overflow: hidden;
    }
  }
`
