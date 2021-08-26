import styled from 'styled-components'

import { media } from '../../assets/styles/_media'
import { WhiteCard } from '../../pages/progress-log/log-health-data/log-health-data-mobile/log-health-data-mobile.styles'

export default styled(WhiteCard)`
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
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-weight: 500;
      font-size: 14px;
      padding: 0 12px;
      &:hover {
        color: ${(p) => p.theme.vars.colors.link};
      }
      &__active {
        color: ${(p) => p.theme.vars.colors.link};
      }
      &__wrapper {
      }
    }
    &__indicator {
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: absolute;
      background-color: ${(p) => p.theme.vars.colors.link};
      height: 2px;
      width: calc(var(--w) - 30px);
      left: calc(var(--l) + 15px);
      bottom: -20px;
    }
  }
`
