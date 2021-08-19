import styled from 'styled-components'

const margin = 20
const padding = 34
export default styled.div`
  width: calc(50% - ${margin / 2}px);
  height: calc(50% - ${margin / 2}px);
  background-color: ${(p) => p.theme.vars.colors.card};
  border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
  color: ${(p) => p.theme.vars.colors.secondary};
  a {
    display: block;
    width: 100%;
    height: 100%;
    color: ${(p) => p.theme.vars.colors.secondary};
    padding: ${padding}px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  &:active {
    color: ${(p) => p.theme.vars.colors.primaryDark};
  }
  &:nth-child(odd) {
    margin-right: ${margin}px;
  }
  &:nth-child(n + 3) {
    margin-top: ${margin}px;
  }
  &.card-action-item {
    &__disabled {
      opacity: 0.3;
      &:hover {
        color: ${(p) => p.theme.vars.colors.secondary};
      }
    }
  }
`
