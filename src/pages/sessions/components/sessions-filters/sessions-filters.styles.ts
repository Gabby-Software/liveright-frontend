import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  margin-bottom: 1.75rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  & .sessions__filter-row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  & .sessions__filter-search {
    flex: 1;
  }

  & .sessions__filter-buttons {
    height: 44px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    width: auto;
    padding: 0 0.5rem;
    margin-left: 1rem;

    & button svg {
      width: 22px;
      height: 22px;
    }
  }

  & .sessions__filter-btn-calendar {
    color: ${getColorCarry('link')};

    &:hover,
    &:focus {
      color: ${getColorCarry('link')};
    }
  }
`

export const DrawerContent = styled.div`
  padding: 1.5rem;

  .drawer {
    &__form-item {
      margin-bottom: 1rem;
    }
  }

  .sessions__filter-select {
    margin-bottom: 1rem;

    &:nth-child(2) {
      margin-bottom: 1.875rem;
    }
  }

  .drawer__submit-btn {
    width: 100%;
  }
`
