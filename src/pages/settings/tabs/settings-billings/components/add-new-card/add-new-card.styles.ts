import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'

export default styled(Card)`
  height: 100%;

  .form {
    .field {
      margin: 5px 0;

      svg {
        color: black;
      }

      p {
        position: unset;
      }

      &.half-input {
        display: inline-block;
        width: 48%;
        margin-right: 8px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .save {
      width: 100%;
      margin: 10px 0;
    }
  }
`
