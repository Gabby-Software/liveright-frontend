import styled from 'styled-components'

import { getColor, getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding-top: 1.25rem;

  .invoice {
    &__toggle {
      align-items: center;
      padding: 0.25rem 0;
      margin-bottom: 0.5rem;

      &-text {
        color: ${getColorCarry('link')};
        font-weight: 500;
      }
    }

    &__issued-text {
      font-weight: 500;
    }

    &__issued-title {
      margin-bottom: 0.5rem;
    }
  }
`

export const HeaderActions = styled.div`
  display: flex;

  .invoice__header-btn {
    color: #fff;

    &:hover,
    &:focus {
      background-color: transparent;
    }
  }
`

export const RowTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: ${getColorCarry('secondary2_v2')};
`

export const RowText = styled.p<any>`
  font-size: 0.875rem;
  font-weight: ${(props) => (props.semibold ? 500 : 400)};
  line-height: 1.25rem;
  color: ${(props) =>
    props.white ? '#fff' : getColor(props, 'primaryDark_v2')};
`

export const RowTextTotal = styled(RowText)`
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: ${getColorCarry('primary_v2')};
`

export const Row = styled.div<any>`
  display: flex;
  justify-content: space-between;
`

export const RowCell = styled.div<any>`
  display: flex;
  flex-direction: column;
  text-align: ${(props) => (props.right ? 'right' : 'left')};
`

export const TableHeadRow = styled.div`
  width: auto;
  margin: 0 -1.25rem;
  padding: 0.75rem 1.25rem;
  background-color: ${getColorCarry('primary_v2')};
  display: flex;
  justify-content: space-between;
`

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${getColorCarry('inputBorder_v2')};
`
