import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .qa-add-exercise {
    &__radio-group {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 1rem;
    }

    &__date,
    &__exercise {
      margin-bottom: 1rem;
    }

    &__radio-input-wrapper {
      width: 100%;
    }

    &__input-group {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    &__input-group-item {
      width: 158px;
    }

    &__button-group {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__button {
      width: 100%;
    }
  }
`
