import styled from 'styled-components'

const wShrink = '10px'
const wGrow = '16px'
export default styled.div`
  &:after {
    position: absolute;
    top: 0;
    right: 10px;
    ${(p) => p.theme.extend.flexCenter}
    width: ${wShrink};
    height: ${wShrink};
    color: white;
    font-size: 8px;
    border-radius: 50%;
    border: 1px solid white;
    box-shadow: 0 0 3px white;
    cursor: pointer;
    transition: ${(p) => p.theme.vars.defaults.transition};
    background-color: ${(p) => p.theme.vars.colors.primary};
  }
  &.notification {
    &__active {
      &:after {
        width: ${wGrow};
        height: ${wGrow};
        content: attr(data-count);
      }
    }
  }
`
