import { Modal } from 'antd'
import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { ActionsLayout, layoutMap } from '../../../../types/actions-layout.type'

export const ActivitiesDialogStyles = styled(Modal)`
  &.ant-modal {
    width: 100%;
    max-width: 830px;

    @media ${mediaQueries.TABLET} {
      max-height: calc(100vh - 2.5rem);
      overflow-y: auto;
      padding-bottom: 0;
      margin: 1.25rem 0;
      border-radius: 15px;
    }
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

export const Styles = styled.div<{ actionsLayout: ActionsLayout }>`
  position: relative;
  color: ${getColorCarry('neutral_100')};

  .ActivitiesDialog {
    &__name {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 2.5rem;

      @media ${mediaQueries.TABLET} {
        font-size: 0.875rem;
        color: ${getColorCarry('neutral_70')};
        margin-bottom: 2rem;
      }
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

      @media ${mediaQueries.TABLET} {
        font-size: 1.375rem;
        margin-bottom: 1.5rem;
      }

      &__note {
        color: ${getColorCarry('red')};
        font-size: 0.875rem;
        font-weight: 400;
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 2rem;

      @media ${mediaQueries.TABLET} {
        margin-bottom: 1rem;
      }
    }

    &__body {
      & p {
        margin: 12px 0;
      }

      & .client-select {
        width: 200px;
        margin-bottom: 24px;
      }

      & .checkbox-container {
        display: flex;
        align-items: center;
        margin: 24px 0;

        & .checkbox {
          margin: 0 0 0 16px;
        }
      }
    }

    &__control {
      margin-bottom: 1.875rem;

      & label {
        margin-bottom: 1.25rem;
        color: ${getColorCarry('neutral_100')};

        @media ${mediaQueries.TABLET} {
          margin-bottom: 0.5rem;
        }
      }

      & .ant-picker {
        max-width: 230px;
      }
    }

    &__alert {
      margin-bottom: 1.875rem;
    }

    &__plans {
      margin-bottom: 32px;

      & .plans-label {
        padding: 16px 0;
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      & .plans-cards {
        display: flex;
        justify-content: space-between;

        & .trainings,
        & .meals {
          width: 45%;

          @media ${mediaQueries.MOBILE} {
            width: 100%;
          }

          & .cover {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            & .icon-wrapper {
              width: 28px;
              height: 28px;
              padding: 4px;
              border-radius: 50%;
              margin-right: 8px;

              & svg {
                width: 20px;
                height: 20px;
              }
            }
          }

          & .plan-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: ${getColorCarry('neutral_70')};
            font-size: 0.875rem;
            padding: 12px 16px;
            margin: 8px 0;
            background-color: ${getColorCarry('secondary1_v2')};
            border-radius: 8px;

            & .plan-card-edit {
              width: 16px;
              height: 16px;
              cursor: pointer;
            }
          }
        }

        & .trainings .icon-wrapper {
          background-color: ${getColorCarry('orange_50')};
          color: ${getColorCarry('white')};
        }

        & .meals .icon-wrapper {
          background-color: ${getColorCarry('primary_v2')};
          color: ${getColorCarry('white')};
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: ${(props) => layoutMap[props.actionsLayout]};

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
      }

      & button {
        margin-right: 1.25rem;

        @media ${mediaQueries.TABLET} {
          width: 100%;
          margin-bottom: 1rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`
