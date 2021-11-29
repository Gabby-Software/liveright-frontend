import { Modal } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const ActivitiesDialogStyles = styled(Modal)`
  &.ant-modal {
    width: 100%;
    max-width: 830px;
  }

  & .ant-modal-body {
    padding: 1.875rem;
  }

  & .ant-modal-content {
    border-radius: 15px;
  }

  & .ant-modal-close {
    width: 30px;
    height: 30px;
    top: 0.75rem;
    right: 1rem;

    & .ant-modal-close-x {
      width: 30px;
      height: 30px;
      color: ${getColorCarry('neutral_100')};
    }
  }
`

export const Styles = styled.div`
  position: relative;
  color: ${getColorCarry('neutral_100')};

  .ActivitiesDialog {
    &__name {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 2.5rem;
    }

    &__description {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 1.25rem;
    }

    &__title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 2rem;
    }

    &__control {
      margin-bottom: 1.875rem;

      & label {
        margin-bottom: 1.25rem;
      }

      & .ant-picker {
        max-width: 230px;
      }
    }

    &__alert {
      margin-bottom: 1.875rem;
    }

    &__actions {
      display: flex;
      align-items: center;

      & button {
        margin-right: 1.25rem;
      }
    }
  }
`
