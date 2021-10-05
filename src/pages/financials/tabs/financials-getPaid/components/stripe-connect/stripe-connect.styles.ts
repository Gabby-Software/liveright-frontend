import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: ${getColorCarry('neutral_100')};
  }

  p {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: ${getColorCarry('neutral_70')};
    margin: 8px 0;
  }

  .divider {
    margin: 10px 0;
    border: 1px solid ${getColorCarry('neutral_30')};

    &__vertical {
      transform: rotate(90deg);
    }
  }

  .link {
    text-decoration: none;
    color: ${getColorCarry('blue_70')};
  }

  .stripe-not-connected {
    text-align: center;

    &__connect_note {
      max-width: 370px;
      margin: auto;
    }

    &__stripe-logo {
      width: 108.84px;
      height: 60px;
      margin: 20px 0;
    }

    & .vertical-divider {
      opacity: 0.1;
      border: 1px solid #ffffff;
      transform: rotate(90deg);
      width: 28px;
    }

    &__connect_button {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 16px;
      margin: 10px auto;
      background: #6176e1;
      color: white;
      border-radius: 10px;
      width: 279px;
      height: 46px;
    }
  }

  .stripe-connected {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px 0;

    &__stripe-logo {
      width: 72.56px;
      height: 40px;
      margin: 0 10px;
    }

    p {
      font-size: 18px;
      margin-right: 8px;
    }
  }
`
