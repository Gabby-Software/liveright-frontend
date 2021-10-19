import styled from 'styled-components'

export const Styles = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
`

export const Link = styled.li`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% / 6);
  border-radius: 22px;
  padding-top: 28px;
  padding-bottom: 31px;
  p {
    font-family: Circular Std;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #10243d;
  }
  .wrapper-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: #d3f5ee;
    // opacity: 0.1;
    border-radius: 25px;
    margin-bottom: 28px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 38px;
        height: 38px;

        path {
          stroke: #72a69b;
        }
      }
    }
  }
  &: hover {
    cursor: pointer;
    background: #125a62;

    p {
      color: #ffffff;
    }
    .wrapper-icon {
      background: #216a72;

      .icon svg path {
        stroke: #ffffff;
      }
    }
  }
`
