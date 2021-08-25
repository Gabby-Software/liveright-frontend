import styled from 'styled-components'

import ProfileImage from '../../../../../components/profile-image/profile-image.component'
import { WhiteCard } from '../../log-health-data-mobile/log-health-data-mobile.styles'

export const BG = styled.div`
  margin-top: -24px;
  padding-top: 18px;
  position: relative;
  &:before {
    ${(p) => p.theme.extend.pseudo}
    left: -20px;
    right: -20px;
    top: -2px;
    height: 80px;
    background-color: ${(p) => p.theme.vars.colors.primaryDark_v2};
    z-index: 0;
  }
`
export const Wrapper = styled(WhiteCard)`
  position: relative;
  z-index: 1;

  color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  .log-client {
    &__label {
      color: ${(p) => p.theme.vars.colors.dark_v2};
      margin-bottom: 20px;
    }
    &__body {
      display: flex;
      align-items: center;
      a {
        display: block;
        color: ${(p) => p.theme.vars.colors.primaryDark_v2};
        margin-left: 15px;
      }
    }
    &__name {
      font-size: 18px;
      font-weight: 700;
    }
    &__data {
      padding-bottom: 20px;
      border-bottom: 1px solid #ededed;
      &__item {
        margin-top: 10px;
        display: flex;
      }
      &__label {
        color: ${(p) => p.theme.vars.colors.dark_v2};
        margin-right: 10px;
      }
      &__value {
      }
    }
    &__actions {
      margin-top: 24px;
      display: flex;
      align-items: center;
    }
    &__switch {
      display: flex;
      align-items: center;
      color: ${(p) => p.theme.vars.colors.link};
      margin-right: auto;
      svg {
        margin-right: 5px;
      }
    }
    &__expend {
      cursor: pointer;
      padding: 4px;
      width: 18px;
      height: auto;
      box-sizing: content-box;
      position: absolute;
      top: 30px;
      right: 15px;
      transform-origin: center center;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &__open {
        color: ${(p) => p.theme.vars.colors.link};
        transform: rotate(0.5turn);
      }
    }
    &__link {
    }
  }
`

export const StyledAvatar = styled(ProfileImage)`
  margin-right: 15px;
  .profile-image__img {
    width: 50px;
    height: 50px;
  }
`
