import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<any>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${getColorCarry('primaryDark_v2')};
  padding: 1.5rem 1.25rem ${getPaddingBottom} 1.25rem;

  .mobile-page-header {
    color: #fff;

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__info-item {
      display: flex;
      align-items: center;
    }

    &__badge {
      & .user-badge__preview {
        border: 1.5px solid #fff;
        border-radius: 9999px;
      }
    }

    &__title {
      color: #fff;
      font-weight: 700;
      font-size: 1.125rem;
    }

    &__action-icon {
      color: #fff;

      &:hover,
      &:focus {
        color: #fff;
        background-color: transparent;
      }

      & svg {
        width: 22px;
        height: 22px;
      }
    }

    &__page-title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.5rem;
    }

    &__page-title {
      font-size: 1.375rem;
      font-weight: 700;
      color: #fff;
    }

    &__component {
      width: 100%;
    }
  }
`

function getPaddingBottom(props: any): string {
  return props.$spacing ? `${0.25 * props.$spacing}rem` : '1.5rem'
}
