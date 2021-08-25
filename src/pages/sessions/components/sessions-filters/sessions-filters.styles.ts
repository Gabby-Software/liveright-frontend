import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<any>`
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
