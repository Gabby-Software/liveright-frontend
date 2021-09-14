import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  max-width: 100%;
  flex-shrink: 0;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px 0 0 0;
  box-shadow: 0 0 20px rgba(230, 236, 242, 0.54);

  .chat-rooms {
    &__head {
      margin-bottom: 1rem;
    }

    &__container {
      height: 100%;
      overflow: auto;
    }
  }

  @media ${mediaQueries.MOBILE} {
    padding: 0;
    background: none;
    border-radius: 0;
    box-shadow: none;

    .chat-rooms {
      &__title {
        display: flex;
        font-size: 22px;
        margin: -2px -20px 0 -20px;
        padding: 20px;
        height: 100px;
        background-color: ${getColorCarry('primaryDark_v2')};
        color: #fff;
      }

      &__head {
        margin-top: -1.25rem;
      }
    }
    .text_input__input {
      margin-top: -24px;
    }
  }
`
