import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'

export default styled.div<{ me: boolean }>`
  border: 1px solid #dfe6f1;
  display: flex;
  align-items: center;
  padding: 14px 21px;
  background-color: #ffebeb;
  .cm-session {
    &__left {
    }
    &__title {
      &:before {
        content: 'Previous';
        color: #757575;
        font-weight: bold;
      }
    }
    &__date {
      margin-top: 8px;
      display: flex;
      align-items: center;
      color: #404040;
      font-size: 18px;
      svg {
        display: block;
        margin-right: 7px;
      }
      ${media('tablet', 'max')`
        font-size: 14px;
      `}
    }
    &__right {
      padding-left: 40px;
    }
    &__cta {
      opacity: 0;
      pointer-events: none;
      touch-action: none;
    }
  }
  &:first-child {
    margin-top: 4px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: white;
    .cm-session {
      &__cta {
        opacity: 1;
        pointer-events: auto;
        touch-action: auto;
      }
      &__title {
        &:before {
          content: 'Suggested Time';
        }
      }
    }
  }
`
