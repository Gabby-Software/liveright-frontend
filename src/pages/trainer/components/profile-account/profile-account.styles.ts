import styled from 'styled-components'

export default styled.div`
  background-color: ${(p) => p.theme.vars.colors.card};
  border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
  padding: 15px 13px;
  min-width: 247px;
  display: flex;
  align-items: center;
  margin-right: 27px;
  cursor: pointer;
  &.account {
    &__disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
  .account {
    &__radio {
      ${(p) => p.theme.extend.flexCenter}
      ${(p) => p.theme.extend.radioCircle}
    }
    &__img {
      ${(p) => p.theme.mixin.circleImage('45px')}
    }
    &__placeholder {
      background-color: ${(p) => p.theme.vars.colors.primary};
      color: white;
      ${(p) => p.theme.extend.h3}
      ${(p) => p.theme.extend.flexCenter}
    }
    &__data {
      margin-left: 15px;
    }
    &__name {
      font-size: 14px;
      font-weight: 500;
      color: black;
    }
    &__type {
      font-size: 18px;
      color: ${(p) => p.theme.vars.colors.secondary3};
    }
  }
`
