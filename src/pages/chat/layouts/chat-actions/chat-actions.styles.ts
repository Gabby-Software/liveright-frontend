import styled from 'styled-components'

export default styled.div`
  padding: 14px 35px;
  background-color: white;
  flex-shrink: 0;
  display: flex;
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px;
  }
`
