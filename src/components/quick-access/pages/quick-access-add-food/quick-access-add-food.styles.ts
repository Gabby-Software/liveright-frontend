import styled from 'styled-components'

// import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export default styled.div`
  h2 {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 16px;
  }

  h3 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }

  .qa-add-food {
    &__date,
    &__food {
      margin-bottom: 1rem;
    }

    &__input-group {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    &__input-group-item {
    }

    &__input-food {
      flex: 1;
    }

    &__input-quantity {
      flex: 0.5;
    }

    &__input-group-nutrients {
      margin: 16px 0 25px 0;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      gap: 18px;
    }

    &__input-nutrient {
      max-width: 71px;
      @media ${mediaQueries.TABLET} {
        max-width: 73px;
      }
    }

    &__meal-overview {
      display: flex;
      gap: 8px;
      width: 90%;
      overflow: auto;
      margin-top: 10px;

      @media ${mediaQueries.TABLET} {
        width: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
        padding-right: 40px;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__button-group {
      margin-top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__button {
      width: 100%;
    }
  }
`
