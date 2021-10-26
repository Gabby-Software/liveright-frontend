import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled.div`
  margin: 20px 0;

  .overviewTable {
    border-radius: 10px;

    & .data-table__head {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    & .red {
      color: ${getColorCarry('red_50')};
    }

    & .green {
      color: ${getColorCarry('green_90')};
    }

    & .edit-icon {
      color: ${getColorCarry('neutral_50')};
      margin-left: 20px;
    }

    & > tbody > tr:last-child {
      background-color: #fcf5e6;
      margin-bottom: 10px;

      td {
        color: #000 !important;
        font-weight: bold;
      }
    }
  }
`
