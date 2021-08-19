import styled from 'styled-components'

import { media } from '../../../assets/styles/_media'

export default styled.div`
  ${(p) => p.theme.extend.flexCenter}
  aspect-ratio: 1;
  margin: 8px;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  transition: ${(p) => p.theme.vars.defaults.transition};
  border: 2px solid transparent;
  cursor: pointer;
  ${media('tablet', 'min')`
                   border-radius: 6px;
                   display: block;
                   padding: 14px;
                   text-align: center;
                   aspect-ratio: unset;
            `}
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    border: 1px solid ${(p) => p.theme.vars.colors.light};
  }
  &:before {
    ${(p) => p.theme.extend.pseudo}
    ${(p) => p.theme.extend.absCover}
                    border-radius: 3px;
    z-index: -1;
    background-color: ${(p) => p.theme.vars.colors.primary};
    transition: ${(p) => p.theme.vars.defaults.transition};
    box-shadow: 0px 4px 10px rgba(247, 56, 80, 0.22);
    transform-origin: center;
    transform: scale(0) rotate(0);
    opacity: 0;
    ${media('tablet', 'min')`
                        content: none;
                    `}
  }
  &.calendar-day {
    &__disabled {
      color: ${(p) => p.theme.vars.colors.secondary2};
      border: none;
    }
    &__selected,
    &:hover {
      color: white;
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
        // border-color:${(p) => p.theme.vars.colors.primary};
        color: ${(p) => p.theme.vars.colors.primary};
        background-color: ${(p) => p.theme.vars.colors.background};
        box-shadow: 0px 4px 10px rgba(247, 56, 80, 0.22);
      }
      &:before {
        transform: scale(1) rotate(90deg);
        opacity: 1;
      }
    }
    .calendar-day {
      &__icon {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: -6px;
        display: block;
        height: 11px;
        filter: drop-shadow(0 0 2px white) drop-shadow(0 0 2px white)
          drop-shadow(0 0 2px white);
        ${media('tablet', 'min')`
                            bottom: auto;
                            top: 16px;
                            right:10px;
                            left:auto;
                        `}
        &__full {
          color: ${(p) => p.theme.vars.colors.success};
        }
        &__partial {
          color: ${(p) => p.theme.vars.colors.warning};
        }
      }
    }
  }
`
