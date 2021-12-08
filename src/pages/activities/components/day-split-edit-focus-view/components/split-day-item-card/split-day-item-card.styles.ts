import styled from 'styled-components'

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayItemCard {
    &__head {
      display: flex;
      margin-bottom: 1.25rem;

      &-icon {
        width: 37px;
        height: 37px;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.25rem;
        color: #fff;
        background-color: ${(props: any) => props.$color};

        & svg {
          width: 20px;
          height: 20px;
        }
      }

      &-control {
        width: 250px;
      }

      &-title {
        margin-bottom: 0.5rem;
      }
    }
  }
`
