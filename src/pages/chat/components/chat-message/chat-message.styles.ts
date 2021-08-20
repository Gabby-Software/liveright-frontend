import styled from 'styled-components'

import ProfileImage from '../../../../components/profile-image/profile-image.component'

export const ProfileImageStyled = styled(ProfileImage)`
  margin: 10px 13px 0 0;
  .profile-image__img {
    width: 32px;
    height: 32px;
  }
`
export default styled.div`
  display: flex;
  padding: 2px;
  .message {
    &__body {
      max-width: 500px;
      width: 100%;
      background-color: ${(p) => p.theme.vars.colors.chat_blue};
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      font-size: 14px;
      border-radius: 0 8px 8px 8px;
      margin: 10px 0;
      &.me {
        background-color: ${(p) => p.theme.vars.colors.chat_dark};
        color: white;
        border-radius: 8px 0 8px 8px;
        margin-left: auto;
      }
    }
  }
`
