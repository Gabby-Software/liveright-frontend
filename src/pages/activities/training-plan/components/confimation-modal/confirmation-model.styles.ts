import styled from 'styled-components'

import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'
import { mediaQueries } from './../../../../../enums/screen-sizes.enum'

export const DialogStyles = styled(Dialog)`
  .confirmation-dialog {
    &__icon {
      margin-bottom: 1.25rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__btn-container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media ${mediaQueries.TABLET} {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    &__btn {
      width: 100%;
      padding: 8px 20px;
      height: fit-content;

      & span {
        white-space: normal;
      }
    }

    &__title {
      font-size: 1.125rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
      text-align: center;
      margin-bottom: 3rem;
    }
  }
`
