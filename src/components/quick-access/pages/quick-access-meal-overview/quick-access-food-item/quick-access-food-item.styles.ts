import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  .qa-food-item {

    &__card {
      background-color: white;
      box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 16px;
      width: fit-content;
      position: relative;
      padding-right: 100px;

      @media ${mediaQueries.TABLET} {
        // padding-right: calc(100% - 220px);
      }

      h2 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        color: #404040;
      }
      &-macronutrients-button {
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
        // width: 90%;
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
      
      &-delete-button {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 72px;
        background-color: ${getColorCarry('primary')};
        outline: none;
        border: none;
        overflow: hidden;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        
        svg {
          color: white;
          width: 20px;
          height: 20px;
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
