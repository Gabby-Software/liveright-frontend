import styled from 'styled-components'

import ChartContainer from '../../../../../../components/chart-container/chart-container.component'
import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled(ChartContainer)`
  .measurements-chart {
    &__legends {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__legend {
      font-size: 0.75rem;
      font-weight: 400;
      color: inherit;
      margin-right: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 1.25rem;

      @media ${mediaQueries.TABLET} {
        padding-left: 1rem;
        margin-right: 1rem;
      }

      &::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 9999px;
        position: absolute;
        left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &:nth-child(1) {
        &::before {
          background-color: ${getColorCarry('green_90')};
        }
      }
      &:nth-child(2) {
        &::before {
          background-color: ${getColorCarry('blue_80')};
        }
      }
      &:nth-child(3) {
        &::before {
          background-color: ${getColorCarry('primary_v2')};
        }
      }
    }
  }
`
