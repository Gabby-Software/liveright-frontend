import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const SettingsLink = styled(Link)`
  margin-left: auto;
`
export default styled.div`
  margin-bottom: 100px;

  .notifications {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      &-container {
        padding-top: 2.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .notification {
    &__hr {
      position: relative;
      z-index: 1;
      margin: 49px 0;
      display: flex;
      justify-content: center;

      &:before {
        ${(p) => p.theme.extend.pseudo}
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 1px;
        background-color: ${getColorCarry('neutral_50')};
      }

      span {
        background-color: ${getColorCarry('background_v2')};
        padding: 0 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};
      }
    }

    &__date-label {
      margin: 1.5rem 0;
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }
  }
`
