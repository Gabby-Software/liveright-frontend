import styled from 'styled-components'

export default styled.div`
  color: ${(props) => props.theme.vars.colors.primary};
  background-color: blue;
  div {
    ${(props) => props.theme.extend.flexCenter}
  }
  .circle {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: blue;
    position: absolute;
    top: 300px;
  }
`
