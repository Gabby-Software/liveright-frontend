import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 14rem;

  @media ${mediaQueries.TABLET} {
    .exercise-input {
      flex-direction: column;
    }
  }

  .exercise-input {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &__prefix {
      width: 40px;
      margin-top: 25px;
    }
    .schedule-time-picker {
      min-width: 10rem;
    }
  }

  .save-action {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1rem;
  }
`
