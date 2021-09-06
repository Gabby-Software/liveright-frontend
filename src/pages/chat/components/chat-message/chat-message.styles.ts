import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import ProfileImage from '../../../../components/profile-image/profile-image.component'
import { chatMessageState } from '../../../../modules/chat/enums/chat-message-state.enum'

export const ProfileImageStyled = styled(ProfileImage)`
  margin: 10px 13px 0 0;
  .profile-image__img {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
  &.popup {
    margin-top: 32px;
  }
`
export default styled.div<{ state?: chatMessageState }>`
  ${({ state }) =>
    [chatMessageState.FAIL, chatMessageState.PENDING].includes(
      state || chatMessageState.SENT
    )
      ? `
cursor: not-allowed;
pointer-events: none;
touch-action: none;
opacity: .3;
`
      : ''}
  .message {
    &__wrapper {
      display: flex;
      padding: 2px;
      position: relative;
    }
    &__links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 50px;
      ${media('tablet', 'max')`
        margin-top: 20px;
      `}
      &__me {
        align-items: flex-end;
        margin-left: 0;
      }
    }
    &__cont {
      display: flex;
      position: relative;
      margin: 14px 0 0 0;
      ${media('tablet', 'max')`
        margin-top: 20px;
      `}
      .popup {
        margin-top: 20px;
      }
      &.me {
        margin-left: auto;
      }
    }
    &__body {
      max-width: 500px;
      background-color: ${(p) => p.theme.vars.colors.chat_blue};
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      font-size: 14px;
      border-radius: 0 8px 8px 8px;
      position: relative;
      order: 1;
      &.me {
        background-color: ${(p) => p.theme.vars.colors.chat_dark};
        color: white;
        border-radius: 8px 0 8px 8px;
      }
    }
    &__time {
      color: ${(p) => p.theme.vars.colors.dark_v2};
      font-size: 12px;
      display: flex;
      margin-top: auto;
      margin-left: 13px;
      order: 2;
      white-space: nowrap;
      svg {
        display: block;
        margin: 0 4px 0 0;
      }
      &.me {
        margin-right: 13px;
        order: 0;
        svg {
          margin: 0 0 0 4px;
        }
      }

      ${media('tablet', 'max')`
            position: absolute;
            top: 100%;
            left: 0;
            margin: 4px 0 0 0;
            &.me {
                left: auto;
                right: 0;
                margin: 4px 0 0 0;
            }
        `};
      &.popup {
        position: absolute;
        top: 100%;
        left: 0;
        margin: 4px 0 0 0;
        &.me {
          left: auto;
          right: 0;
          margin: 4px 0 0 0;
        }
      }
    }
  }
`
