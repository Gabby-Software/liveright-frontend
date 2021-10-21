import styled from 'styled-components'

export const Styles = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
  margin-bottom: 38px;
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
  transition: ${(p) => p.theme.vars.defaults.transition};
  p {
    font-family: Circular Std;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #10243d;
    transition: ${(p) => p.theme.vars.defaults.transition};
  }
  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: #d3f5ee;
    border-radius: 25px;
    margin-bottom: 28px;
    transition: ${(p) => p.theme.vars.defaults.transition};

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 38px;
        height: 38px;

        path {
          stroke: #72a69b;
          transition: ${(p) => p.theme.vars.defaults.transition};
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
    .icon-wrapper {
      background: #216a72;

      .icon svg path {
        stroke: #ffffff;
      }
    }
  }
`
