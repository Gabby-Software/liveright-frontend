import styled from 'styled-components'

export const Styles = styled.ul`
  display: flex;
  gap: 20px;
  padding: 0;
  margin-bottom: 38px;
`

export const LinkItem = styled.li`
  background: #ffffff;
  width: calc(100% / 6);
  border-radius: 22px;
  list-style: none;
  transition: ${(p) => p.theme.vars.defaults.transition};

  .link {
    display: block;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  p {
    font-family: Circular Std;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #10243d;
    transition: ${(p) => p.theme.vars.defaults.transition};
  }
  & .link .li-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    background: #d3f5ee;
    border-radius: 25px;
    margin-bottom: 28px;
    margin-right: auto;
    margin-left: auto;
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
  &:hover {
    cursor: pointer;
    background: #125a62;

    p {
      color: #ffffff;
    }
    .link .li-icon-wrapper {
      background: #216a72;

      .icon svg path {
        stroke: #ffffff;
      }
    }
    &:last-child {
      .link .li-icon-wrapper {
        .icon svg path {
          fill: #ffffff;
        }
      }
    }
  }
`
