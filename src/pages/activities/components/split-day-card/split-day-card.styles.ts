import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  color: ${getColorCarry('neutral_100')};

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayCard {
    &__schedule {
      font-size: 1.375rem;
      font-weight: 700;
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 1rem;

      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: ${getColorCarry('inputBorder_v2')};
        margin-left: 1.375rem;
      }
    }

    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
      padding-left: ${(props) => (props.$schedule ? 'calc(42px + 1rem)' : 0)};
    }

    &__icon {
      width: 42px;
      height: 42px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${(props: any) => props.$color};
      color: #fff;
      margin-right: 1rem;

      & svg {
        width: 20px;
        height: 20px;
        color: #fff;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding-left: calc(42px + 1rem);
    }

    &__macronutrients {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      margin: 0 -0.25rem;
      margin-bottom: 1rem;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`
