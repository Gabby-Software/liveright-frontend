import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

interface StyledCardProps {
  active: boolean
}

export default styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  border-radius: 10px;
  background-color: #fff;
  padding: 1.5rem 1.75rem;
  margin: 1rem;
  border: 2px solid
    ${(props) =>
      props.active ? getColorCarry('primary_v2') : getColorCarry('neutral_30')};
  box-sizing: border-box;
  position: relative;

  @media ${mediaQueries.TABLET} {
    padding: 1.5rem 1.25rem;
    margin: 1rem 0;
  }

  .radio {
    width: 20px;
    height: 20px;
    border: 2px solid ${getColorCarry('primary_v2')};
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &__checked {
      width: 10px;
      height: 10px;
      margin: auto;
      border-radius: 50%;
      background-color: ${getColorCarry('primary_v2')};
    }
  }

  .content {
    margin: 10px 8px;
    padding: 10px;

    &__title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 63px;

      h4 {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      }

      img {
        width: 80px;
      }
    }

    &__card_no {
      font-size: 22px;
      line-height: 32px;
      margin: 15px 0;
    }

    &__details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      aling-items: center;
      margin: 10px 0;

      &__item {
        width: 150px;
        font-size: 16px;

        & .item_heading {
          color: ${getColorCarry('secondary2_v2')};
          line-height: 24px;
          margin: 8px 0;
        }

        & .item_info {
          color: ${getColorCarry('primaryDark_v2')};
          line-height: 24px;
          font-weight: 500;
          margin: 8px 0;
        }
      }
    }
  }
`
