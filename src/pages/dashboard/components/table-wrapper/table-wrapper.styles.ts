import styled from 'styled-components'

export const Table = styled.div`
  & table thead {
    .data-table__th {
      padding: 15px 20px 15px 20px;
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
        color: #5e5e5e;

        .icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
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
