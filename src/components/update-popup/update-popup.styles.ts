import styled, { keyframes } from 'styled-components'

const popup = keyframes`
    from {bottom: -50px;opacity:.1}
    to {bottom: 10px;opacity:1}
`
export default styled.div`
  position: fixed;
  z-index: 1000;
  left: 10px;
  bottom: 10px;
  max-width: calc(100% - 20px);
  background: white;
  border: 1px solid ${(p) => p.theme.vars.colors.inputBorder};
  border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
  padding: 14px 14px;
  animation: 1 ${popup} 0.3s ease;
  .update {
    &__title {
      ${(p) => p.theme.extend.h3}
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__desc {
      ${(p) => p.theme.extend.h3}
      color: ${(p) => p.theme.vars.colors.primary_v2};
      cursor: pointer;
    }
  }
`
