import styled from 'styled-components'

import ProfileImage from '../../../../../components/profile-image/profile-image.component'
import WhiteCard from '../../../../../components/white-card/white-card.component'

export const Wrapper = styled(WhiteCard)`
  margin-bottom: 30px;
  .log-client {
    &__label {
      font-size: 16px;
      color: ${(p) => p.theme.vars.colors.secondary2_v2};
      margin-bottom: 20px;
    }
    &__top {
      display: flex;
      align-items: center;
    }
    &__bottom {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-top: 10px;
      &__item {
        display: flex;
        align-items: center;
      }
      &__separator {
        margin: 2px 30px;
        opacity: 0.8;
        align-self: stretch;
        border-right: 1px solid #757575;
      }
      &__label {
        color: ${(p) => p.theme.vars.colors.dark_v2};
        margin-right: 10px;
      }
      &__value {
      }
    }
    &__body {
      ${(p) => p.theme.extend.flexCenter}
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    }
    &__main {
      width: 100%;
    }
    &__name {
      font-size: 18px;
      font-weight: 700;
    }
    &__switch {
      display: flex;
      align-items: center;
      color: ${(p) => p.theme.vars.colors.link};
      margin-left: 20px;
      svg {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
    &__actions {
      display: flex;
      align-items: center;
    }
    &__chat {
      margin-right: 20px;
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    }
    &__expand {
      margin-left: 50px;
      transform-origin: center center;
      transition: ${(p) => p.theme.vars.defaults.transition};
      cursor: pointer;
      &__open {
        transform: rotate(0.5turn);
        color: ${(p) => p.theme.vars.colors.link};
      }
    }
  }
`

export const StyledAvatar = styled(ProfileImage)`
  margin-right: 15px;
  .profile-image__img {
    width: 60px;
    height: 60px;
  }
`
