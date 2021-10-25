import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Table = styled.div`
  & table thead {
    .data-table__th {
      padding: 15px 20px 15px 20px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    th:first-child {
      border-radius: 10px 0 0 10px;
    }
    th:last-child {
      border-radius: 0 10px 10px 0;
    }
  }
  & table tbody {
    .data-table__tr {
      td {
        padding: 15px 20px 15px 20px;
        font-size: 18px;
        line-height: 26px;
        color: ${getColorCarry('primaryDark_v2')};
        font-size: 14px;
        line-height: 20px;

        .icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .percentage .percentage__red {
          color: ${getColorCarry('red_80')};
        }

        .percentage .percentage__green {
          color: ${getColorCarry('green_80')};
        }
        .table-actions {
          display: flex;

          & svg {
            width: 25px;
            height: 25px;
          }
          & :nth-child(1) svg {
            color: ${getColorCarry('blue_80')};
          }
          & :nth-child(2) svg {
            color: ${getColorCarry('red_80')};
          }
          & :nth-child(3) svg {
            color: ${getColorCarry('orange_60')};
          }
          & :nth-child(4) svg {
            color: ${getColorCarry('primaryDark_v2')};
          }
        }
      }
      td:first-child {
        border-radius: 10px 0 0 10px;
      }
      td:last-child {
        border-radius: 0 10px 10px 0;
      }
    }
  }
`
