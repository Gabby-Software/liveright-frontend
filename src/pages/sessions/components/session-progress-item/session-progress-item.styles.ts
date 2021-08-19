import styled, { css } from 'styled-components'

const rowStyles = css`
  flex-direction: row;
  margin-right: 0;

  & > span {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    margin-right: 16px;
    margin-bottom: 0;
  }

  div:last-child {
    border-top-width: 1px;
  }
`

export default styled.div<{ row?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;

  & > span {
    ${(p) => p.theme.extend.label};
    margin-bottom: 8px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.vars.colors.secondary};
    width: 100px;
    height: 75px;

    span:nth-child(2) {
      color: ${({ theme }) => theme.vars.colors.primary};
    }
  }

  div:last-child {
    border-top-width: 0;
    background-color: ${({ theme }) => theme.vars.colors.light};
  }

  ${({ row }) => (row ? rowStyles : '')}
`
