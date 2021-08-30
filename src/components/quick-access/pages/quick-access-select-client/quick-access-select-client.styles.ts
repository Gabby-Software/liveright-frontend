import styled from 'styled-components'

export default styled.div`
  min-height: 140px;
  .profile-image__img {
    width: 39px;
    height: 39px;
    font-size: 14px;
  }
  .qa-search {
    &__clients {
      margin-top: 35px;
    }
    &__client {
      display: flex;
      align-items: center;
      margin: 10px 0;
      &__data {
        margin: 0 auto 0 11px;
      }
      &__name {
        font-weight: 700;
        font-size: 14px;
        color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      }
      &__email {
        font-size: 12px;
        font-weight: 400;
        color: ${(p) => p.theme.vars.colors.secondary2_v2};
      }

      &__action {
        max-width: 60px;
        margin: auto 0 auto 10px;
        background-color: transparent;
      }
    }
  }
`
