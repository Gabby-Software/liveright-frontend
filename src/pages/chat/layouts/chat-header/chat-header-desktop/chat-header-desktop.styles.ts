import styled from 'styled-components'

export const ClientHeader = styled.div`
  padding: 25px 29px;
  font-size: 14px;
  font-weight: 700;
  color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  background-color: white;
`
export default styled.div`
  display: flex;
  padding: 26px 35px;
  background-color: white;
  flex-shrink: 0;
  .chat-header {
    &__body {
      width: 100%;
      &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      &__bottom {
        display: flex;
        margin-top: 11px;
      }
    }
    &__name {
      font-weight: 700;
      font-size: 18px;
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    }
    &__arrow {
      height: 8px;
      width: auto;
      margin-left: 13px;
    }
    &__data {
      display: flex;
      color: ${(p) => p.theme.vars.colors.dark_v2};
      margin-right: 38px;
      svg {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        color: ${(p) => p.theme.vars.colors.secondary2_v2};
      }
    }
    &__minimize {
      cursor: pointer;
      margin-left: auto;
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
    }
  }
`
