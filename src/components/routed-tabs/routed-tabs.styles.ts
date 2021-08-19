import styled from 'styled-components'

import { media } from '../../assets/styles/_media'

export default styled.div`
  margin-bottom: 70px;
  max-width: 100%;
  overflow: auto;
  display: flex;
  ${media('tablet', 'max')`
        margin: 0 -20px 70px -20px;
        max-width: calc(100% + 40px);
        justify-content: center;
    `}
  .tabs {
    &__wrapper {
      display: flex;
      position: relative;
      max-width: 100%;
    }
    &__item {
      display: block;
      color: ${(p) => p.theme.vars.colors.secondary};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-weight: 500;
      font-size: 14px;
      padding: 4px 12px;
      &:hover {
        color: ${(p) => p.theme.vars.colors.primary};
      }
      &__active {
        color: ${(p) => p.theme.vars.colors.primary};
      }
      &__wrapper {
      }
    }
    &__indicator {
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: absolute;
      background-color: ${(p) => p.theme.vars.colors.primary};
      height: 2px;
      width: var(--w);
      left: var(--l);
      bottom: 0;
    }
  }
`
