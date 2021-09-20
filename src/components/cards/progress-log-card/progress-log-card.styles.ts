import styled from 'styled-components'

import { getColor, getColorCarry } from '../../../pipes/theme-color.pipe'
import Card from '../../cards/card/card.component'

function getBadgeColor(props: any) {
  switch (props.$quality) {
    case 'average':
      return getColor(props, 'yellow_60')
    case 'good':
      return getColor(props, 'green_90')
    default:
      return getColor(props, 'yellow_60')
  }
}

function getBadgeBgColor(props: any) {
  switch (props.$quality) {
    case 'average':
      return getColor(props, 'yellow_20')
    case 'good':
      return getColor(props, 'green_20')
    default:
      return getColor(props, 'yellow_20')
  }
}

export const Styles = styled<any>(Card)`
  margin-bottom: 1.25rem;

  .progress-log-card {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__badge {
      font-size: 1rem;
      font-weight: 500;
      padding: 0.625rem 1.25rem;
      background-color: ${getBadgeBgColor};
      color: ${getBadgeColor};
      border-radius: 8px;
    }

    &__reported {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;

      &-text {
        font-size: 0.875rem;
        color: ${getColorCarry('secondary2_v2')};
      }
    }

    &__sleep {
      &-text {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('primaryDark_v2')};
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__value {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }
  }
`
