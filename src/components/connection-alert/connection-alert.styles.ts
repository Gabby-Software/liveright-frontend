import styled from 'styled-components'

export default styled.div`
  position: fixed;
  pointer-events: none;
  touch-action: none;
  z-index: ${(p) => p.theme.vars.zIndex.toast};
  top: 0;
  right: 0;
  left: 0;
  border-radius: 8px;
  padding: 12px 12px;
  color: white;
  margin: 20px auto;
  width: 400px;
  max-width: calc(100% - 40px);
  transition: transform 0.3s ease;
  &.connection {
    &__on {
      transform: translateY(-150px);
      background-color: ${(p) => p.theme.vars.colors.success};
      transition-delay: 1s;
    }
    &__off {
      transform: translateY(0px);
      background-color: ${(p) => p.theme.vars.colors.error};
    }
  }
`
