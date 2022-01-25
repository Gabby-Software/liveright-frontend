import Modal from 'antd/lib/modal/Modal'
import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .WorkoutPlanDayDialog {
    &__header {
      margin-bottom: 1.5rem;

      &-title {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
      }

      &-subtitle {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: ${getColorCarry('neutral_70')};
      }
    }

    &__content {
      padding-left: 0 !important;
    }
  }
`

export const DialogStyles = styled(Modal)`
  &.ant-modal {
    width: 100%;
    max-width: 830px;
    padding: 0 10px;

    @media ${mediaQueries.TABLET} {
      overflow-y: auto;
      padding-bottom: 0;
      margin: 1.25rem 0;
      border-radius: 15px;
    }
  }

  & .ant-modal-body {
    padding: 1.875rem;

    @media ${mediaQueries.TABLET} {
      padding: 1.875rem 1.5rem;
    }
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
