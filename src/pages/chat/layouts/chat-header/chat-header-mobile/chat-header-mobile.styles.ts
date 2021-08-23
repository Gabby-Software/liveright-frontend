import styled from 'styled-components'

import ProfileImage from '../../../../../components/profile-image/profile-image.component'

export const StyledAvatar = styled(ProfileImage)`
  margin: 0 12px;
  .profile-image__img {
    width: 38px;
    height: 38px;
    border: 1.5px solid white;
  }
  img.profile-image__img {
    background-color: white;
  }
`
export const HeaderHolder = styled.div`
  height: 100px;
`
export default styled.div`
  background-color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  color: white;
  padding: 27px 30px 0 30px;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${(p) => p.theme.vars.zIndex.header};
  ${(p) => p.theme.extend.flexCenter}
  &.chat-header__popup {
    padding-top: 0;
    height: 73px;
  }
  .chat-header {
    &__back {
      svg {
        color: white;
        height: 9px;
        margin-right: 3px;
      }
    }
    &__name {
      font-size: 16px;
    }
    &__link {
      margin-left: auto;
      display: flex;
      align-items: center;
      svg {
        display: block;
        margin-left: 12px;
        cursor: pointer;
      }
    }
  }
`
