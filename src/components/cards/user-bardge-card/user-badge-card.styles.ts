import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import Card from '../../card/card.style'

export default styled(Card)`
  padding: 1rem;
  background-color: ${getColorCarry('background')};
  display: flex;
  flex-direction: row;
  width: 100%;

  .user-badge-card {
    &__placeholder {
      font-size: 0.875rem;
      color: #fff;
      font-weight: 700;
    }

    &__img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background-color: ${getColorCarry('primary_v2')};
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }
    }

    &__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
    }

    &__title {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 500;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__subtitle {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${getColorCarry('secondary2_v2')};
    }
  }
`
