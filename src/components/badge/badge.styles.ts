import styled from 'styled-components'

export default styled.div`
  ${(p) => p.theme.extend.flexCenter}
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid white;
  position: absolute;
  bottom: -0px;
  right: -5px;
  cursor: pointer;
  &.badge {
    &__primary {
      background-color: ${(p) => p.theme.vars.colors.primary};
      color: white;
      border-color: white;
    }
  }
  svg {
    width: 15px;
    height: 15px;
  }
`
