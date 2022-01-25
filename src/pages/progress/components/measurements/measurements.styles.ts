import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<{ isDashboard?: boolean }>`
  width: 100%;
  ${(props) =>
    props.isDashboard
      ? 'grid-area: 2 / 1 / 3 / 3; background-color: #fff; border-radius: 10px; padding: 1.5rem 1.75rem 1rem 1.75rem; height: fit-content;'
      : ''}

  .measurements {
    &__table {
      width: 100%;

      &-edit {
        display: flex;
        align-items: center;
        color: ${getColorCarry('primaryDark_v2')};

        & svg {
          margin-left: 0.5rem;
          color: ${getColorCarry('secondary2_v2')};
        }
      }

      &-container {
        width: auto;
        margin: -1.5rem -1.75rem 0 -1.75rem;
      }

      &-card {
        overflow: hidden;
      }
    }

    &__content {
      margin-bottom: 1.875rem;
    }
  }
`
