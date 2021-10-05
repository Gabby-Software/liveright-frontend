import styled from 'styled-components'

import ChartContainer from '../../../../components/chart-container/chart-container.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(ChartContainer)`
  margin-bottom: 2rem;

  .chart {
    &__quality {
      display: flex;
      align-items: center;

      &-text {
        font-size: 0.75rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin: 0 1rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          position: absolute;
          left: 0;
        }

        &:nth-child(1) {
          &::before {
            background-color: ${getColorCarry('green_90')};
          }
        }

        &:nth-child(2) {
          &::before {
            background-color: ${getColorCarry('red_80')};
          }
        }

        &:nth-child(3) {
          &::before {
            background-color: ${getColorCarry('yellow_60')};
          }
        }
      }
    }
  }
`
