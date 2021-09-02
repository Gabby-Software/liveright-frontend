import styled from 'styled-components'

const wShrink = '10px'
const wGrow = '16px'
export default styled.div`
  height: 22px;
  position: relative;

  &:after {
    position: absolute;
    top: -5px;
    left: -5px;
    ${(p) => p.theme.extend.flexCenter}
    width: ${wShrink};
    height: ${wShrink};
    color: #fff;
    font-size: 0.625rem;
    border-radius: 9999px;
    border: 1px solid #fff;
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
