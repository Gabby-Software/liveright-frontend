import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'

export default styled.div`
  ${(p) => p.theme.extend.flexCenter}
  padding: 6px 12px;
  width: 292px;
  max-width: 100%;

  ${media('tablet', 'max')`
    width: 240px;
  `}

  .cm-audio {
    &__microphone {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin: 3px 0;
      display: block;
      color: ${(p) => p.theme.vars.colors.secondary7_v2};
    }

    &__divider {
      align-self: stretch;
      border-right: 1px solid ${(p) => p.theme.vars.colors.secondary8_v2};
      margin: 0 10px;
    }

    &__action {
      width: 30px;
      height: 30px;
      display: block;
      color: ${(p) => p.theme.vars.colors.link};
      cursor: pointer;
      flex-shrink: 0;
    }
    &__progress {
      width: 100%;
      height: 2px;
      background-color: white;
      position: relative;
      margin: 1px 15px 0 15px;

      &:before {
        ${(p) => p.theme.extend.pseudo}
        top:0;
        bottom: 0;
        background-color: ${(p) => p.theme.vars.colors.link_lighten};
        width: var(--progress);
      }
      &:after {
        ${(p) => p.theme.extend.pseudo}
        ${(p) => p.theme.mixin.circleImage('9px')}
        background-color: ${(p) => p.theme.vars.colors.link_lighten};
        top: -3px;
        left: calc(var(--progress) - 4px);
      }
    }
  }
  &.cm-audio {
    &__popup {
      max-width: 240px;
    }
    &__me {
      .cm-audio {
        &__microphone {
          color: ${(p) => p.theme.vars.colors.secondary2_v2};
        }
        &__divider {
          border-color: ${(p) => p.theme.vars.colors.secondary8_v2};
        }
      }
    }
  }
`
