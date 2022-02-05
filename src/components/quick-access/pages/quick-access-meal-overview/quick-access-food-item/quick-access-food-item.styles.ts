import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  .qa-food-item {

    &__card {
      background-color: white;
      box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 16px;
      h2 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        color: #404040;
      }
      button {
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        color: ${getColorCarry('link')};
        margin-top: 10px;
        display: flex;
        align-items: center;
        svg {
          margin-left: 5px;
        }
      }

      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        color: ${getColorCarry('red')};
      }

      &-macronutrients {
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
      
      &-input-group {
        display: flex;
        gap: 16px;
        justify-content: space-between;
        margin-top: 20px;
        input {
          width: 100%;
        }
      }
      }
    }
  }
`
