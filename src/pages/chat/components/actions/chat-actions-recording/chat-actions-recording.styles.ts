import styled from 'styled-components'

import { darken } from '../../../../../assets/styles/_media'

export default styled.form`
  padding: 14px 35px;
  background-color: white;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px;
  }
  .chat-rec {
    &__indicator {
      display: flex;
      width: 100%;
      padding: 12px 18px;
      background-color: ${(p) => p.theme.vars.colors.background_v2};
      border-radius: 8px;
    }
    &__mic {
      color: ${(p) => p.theme.vars.colors.primary_v2};
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
    &__time {
    }
    &__cancel {
      cursor: pointer;
      color: ${(p) => p.theme.vars.colors.orange};
      transition: ${(p) => p.theme.vars.defaults.transition};
      margin-left: auto;
      display: flex;
      align-items: center;
      &:hover {
        color: ${(p) => darken(p.theme.vars.colors.orange, 0.9)};
      }
      svg {
        display: block;
        width: 24px;
        height: 24px;
        margin-top: -1px;
      }
    }
  }
`
