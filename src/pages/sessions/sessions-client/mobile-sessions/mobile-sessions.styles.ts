import styled from 'styled-components'

export default styled.div<{ credits: number }>`
  .sessions {
    &__options {
      display: flex;
      flex-direction: row;
      max-width: 100%;
      margin-top: 16px;

      button:nth-child(1) {
        box-shadow: none;
        margin-right: 8px;
      }
    }

    &__credits {
      margin-bottom: 32px;

      div:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0,
          rgba(27, 31, 35, 0.15) 0 0 0 1px;
        border-radius: 5px;
        font-size: 14px;
        padding: 8px 16px;
        user-select: none;
        margin-bottom: 8px;

        span:last-child {
          color: ${({ theme, credits }) =>
            credits > 0
              ? theme.vars.colors.dark
              : theme.vars.colors.primaryLight};
        }
      }

      button:last-child {
        padding: 10px;
      }
    }
  }
`
