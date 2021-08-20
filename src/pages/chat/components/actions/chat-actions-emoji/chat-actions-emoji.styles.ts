import styled from 'styled-components'

export default styled.div`
  position: relative;
  color: ${(p) => p.theme.vars.colors.dark_v2};
  svg {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: filter 0.3s ease;
    filter: drop-shadow(0 0 0 ${(p) => p.theme.vars.colors.secondary2_v2});
    will-change: filter;
    &:hover {
      transition: filter 0.5s ease;
      filter: drop-shadow(0 0 2px ${(p) => p.theme.vars.colors.secondary2_v2});
    }
  }
  .emoji-picker-react {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    transition: ${(p) => p.theme.vars.defaults.transition};
    opacity: 0;
    transform-origin: bottom center;
  }
  &.emoji-picker__open {
    .emoji-picker-react {
      transform: translateX(-50%) scaleY(1);
      opacity: 1;
    }
  }
`
