import styled from 'styled-components'

import { media } from '../../assets/styles/_media'
import { WhiteCard } from '../../pages/progress-log/log-health-data/log-health-data-mobile/log-health-data-mobile.styles'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled(WhiteCard)`
  max-width: 100%;
  overflow: auto;
  display: flex;
  padding: 0 1.75rem;
  border-radius: 10px;

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
      color: ${getColorCarry('primaryDark_v2')};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-weight: 500;
      padding: 17px 0;
      font-size: 0.875rem;
      line-height: 1.125rem;

      &:hover {
        color: ${getColorCarry('blue_70')};
      }
      &__active {
        color: ${getColorCarry('blue_70')};
      }
      &__wrapper {
        &:not(:first-child) {
          margin: 0 0 0 32px;
        }
      }
    }
    &__indicator {
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: absolute;
      background-color: ${getColorCarry('blue_70')};
      height: 2px;
      width: calc(var(--w));
      left: calc(var(--l));
      bottom: 0;
    }
  }
`
