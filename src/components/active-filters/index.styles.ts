import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'
import Card from '../cards/card/card.component'

export const Styles = styled(Card)`
  width: 100%;
  margin-top: 0.75rem;

  .active-filters {
    &__title {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${getColorCarry('primaryDark2_v2')};
      margin-bottom: 1rem;
    }
  }
`

export const FilterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.1rem 0;

  & svg {
    width: 20px;
    height: 20px;
    color: ${getColorCarry('secondary2_v2')};
  }

  .filter-card {
    &__title {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};

      & span {
        color: ${getColorCarry('primaryDark2_v2')};
      }
    }
  }
`
