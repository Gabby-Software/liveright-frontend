import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;
`

export const StylesContent = styled(Card)`
  .training-plans {
    &__back {
      padding: 0;
      margin-bottom: 1.5rem;
    }

    &__title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
    }

    &__filters {
      display: flex;
      margin-bottom: 1.5rem;
    }

    &__select {
      width: 200px;
      margin-right: 1.25rem;
    }

    &__table {
      &-link {
        color: ${getColorCarry('link')};
      }

      &-status {
        &[data-status='active'] {
          color: ${getColorCarry('primary_v2')};
        }
        &[data-status='inactive'] {
          color: ${getColorCarry('red')};
        }
      }
    }
  }
`
