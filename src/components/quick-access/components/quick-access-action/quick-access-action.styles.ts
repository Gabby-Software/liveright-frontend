import styled from 'styled-components'

import { darken } from '../../../../assets/styles/_media'

export default styled.div<{ color: string }>`
  width: 98px;
  height: 100px;
  background-color: ${(p) => p.theme.vars.colors.secondary3_v2};
  color: ${(p) => p.theme.vars.colors.secondary2_v2};
  ${(p) => p.theme.extend.flexCenter}
  flex-direction: column;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: ${(p) => p.theme.vars.defaults.transition};
  &:hover {
    background-color: ${(p) => darken(p.theme.vars.colors.secondary3_v2, 0.98)};
  }
  svg {
    width: 36px;
    height: 36px;
    display: block;
    color: ${({ color }) => color};
  }
  .qa-action {
    &__label {
      margin-top: 11px;
      font-size: 12px;
      font-weight: 300;
    }
  }
`
