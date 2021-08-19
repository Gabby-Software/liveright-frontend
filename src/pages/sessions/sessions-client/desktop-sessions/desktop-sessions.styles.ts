import styled from 'styled-components'

export const TitleContent = styled.div<{ credits: number }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .credits {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 32px;
    border: 1px solid ${(p) => p.theme.vars.colors.secondary3};
    font-size: 14px;
    margin-right: 8px;
    padding: 16px;
    user-select: none;

    span:first-child {
      margin-right: 48px;
    }
    span:last-child {
      color: ${({ theme, credits }) =>
        credits > 0 ? theme.vars.colors.dark : theme.vars.colors.primaryLight};
    }
  }

  button {
    padding: 4px 17px;
    box-shadow: none;
    width: auto;
    height: 40px;
    margin-right: 8px;
  }
`

export default styled.div`
  display: flex;
  overflow: auto;
  .sessions {
    width: 100%;

    &__options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;

      button {
        padding: 4px 17px;
        box-shadow: none;
        width: auto;
        height: 40px;
        margin-right: 4px;
      }
    }
  }
`
