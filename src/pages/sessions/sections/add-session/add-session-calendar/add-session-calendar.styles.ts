import styled from 'styled-components'

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const CalendarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  overflow: hidden;
  .add-session__calendar {
    &__item {
      height: 100%;
      min-height: 80px;
      border-top: 1px solid ${(p) => p.theme.vars.colors.secondary2};
      padding: 6px;
      position: relative;
    }
    &__time {
      color: ${(p) => p.theme.vars.colors.secondary3};
    }
    &__event {
      position: absolute;
      right: 0;
      width: 70%;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      background-color: ${(p) => p.theme.vars.colors.secondary2};
      color: black;
      padding: 0px 12px;
      display: flex;
      font-weight: 600;
      opacity: 0.6;
      align-items: center;
      &__overlap {
        background-color: ${(p) => p.theme.vars.colors.primaryDark};
        color: white;
      }
      &__current {
        background-color: ${(p) => p.theme.vars.colors.primary};
        z-index: 3;
        left: 60px;
      }
      &__suggested {
        background-color: ${(p) => p.theme.vars.colors.secondary2};
        z-index: 2;
        left: 60px;
      }
    }
  }
`
