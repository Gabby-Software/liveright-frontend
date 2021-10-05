import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { WhiteCard } from '../../pages/progress-log/log-health-data/log-health-data-mobile/log-health-data-mobile.styles'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled(WhiteCard)`
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  padding: 0;
  border-radius: 10px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  .tabs {
    &__content {
      width: max-content;
      min-width: 100%;
      display: flex;

      @media ${mediaQueries.TABLET} {
        justify-content: center;
      }
    }

    &__wrapper {
      display: flex;
      position: relative;
      padding: 0 1.75rem;
      width: max-content;

      @media ${mediaQueries.TABLET} {
        padding: 0 1rem;
      }
    }

    &__item {
      display: block;
      color: ${getColorCarry('primaryDark_v2')};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.125rem;
      white-space: nowrap;

      &:hover {
        color: ${getColorCarry('blue_70')};
      }

      &__active {
        color: ${getColorCarry('blue_70')};
      }

      &__wrapper {
        padding: 1rem 0;
        margin: 0 0.5rem;
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
