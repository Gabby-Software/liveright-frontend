import styled from 'styled-components'

import Card from '../../../../components/card/card.style'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled.div`
  .progress-overtime {
    &__header {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-filters {
        display: flex;
        align-items: center;
      }
    }

    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__toggle-btn {
      padding: 0;
      height: fit-content;
      font-weight: 400;
    }

    &__form-item {
      margin-left: 1.25rem;

      &_date {
        width: 200px;
      }

      &_select {
        width: 250px;
      }
    }
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  form {
    display: flex;
    align-items: center;
  }
`

export const TableWrapper = styled(Card)<{ isMobile?: boolean }>`
  margin-bottom: 32px;
`
