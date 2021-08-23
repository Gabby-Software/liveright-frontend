import styled, { keyframes } from 'styled-components'

const anim = keyframes`
    0% {transform: translateY(50px);opacity:0}
    100% {transform: translateY(0);opacity:1}
`
export default styled.div`
  position: relative;
  border-radius: 8px 8px 0 0;
  margin: 0 35px 0 0;
  height: 460px;
  pointer-events: auto;
  touch-action: auto;
  width: 375px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.07);
  animation: 1 ${anim} 0.3s ease-out;
  .chat-header {
    position: absolute;
    border-radius: 8px 8px 0 0;
  }
`
