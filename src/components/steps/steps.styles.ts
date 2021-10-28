import styled from 'styled-components'

export default styled.div`
  overflow: hidden;
  width: 100%;
  .steps {
    &__wrapper {
      display: flex;
      transition: ${(p) => p.theme.vars.defaults.transition};
    }
    &__dots {
      ${(p) => p.theme.extend.flexCenter}
      margin: 70px 0 0 0;
    }
    &__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${(p) => p.theme.vars.colors.secondary2};
      transition: ${(p) => p.theme.vars.defaults.transition};
      margin: 0 15px;
      &__active {
        background-color: ${(p) => p.theme.vars.colors.primary_v2};
      }
    }
    &__step {
      width: 100%;
      overflow: hidden;
    }
  }
`
