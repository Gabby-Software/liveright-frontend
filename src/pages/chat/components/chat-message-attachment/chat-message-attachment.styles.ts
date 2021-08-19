import styled from 'styled-components'

export default styled.a`
  display: flex;
  padding: 8px 16px;
  cursor: pointer;
  .cm-file {
    &__icon {
      height: 36px;
      display: block;
      margin-right: 14px;
    }
    &__name {
      font-size: 14px;
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    }
    &__data {
      // margin-top: 6px;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: ${(p) => p.theme.vars.colors.secondary6_v2};
    }
    &__divider {
      ${(p) => p.theme.mixin.circleImage('4px')}
      margin: 0 6px;
      background-color: ${(p) => p.theme.vars.colors.secondary6_v2};
    }
  }
`
