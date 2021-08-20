import styled from 'styled-components'

export default styled.div`
  height: 100%;
  overflow: auto;
  background-color: #f7f9fc;
  padding: 26px 34px;
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    background-color: ${(p) => p.theme.vars.colors.background_v2};
    padding: 0;
    margin-bottom: -50px;
  }
`
