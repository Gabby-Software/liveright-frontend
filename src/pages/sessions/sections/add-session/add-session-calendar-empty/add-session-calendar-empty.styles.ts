import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .add-session {
    &__empty {
      &__icon {
        width: 60px;
        height: auto;
        display: block;
        margin: 2rem 0;
        color: ${getColorCarry('primaryDark_v2')};
      }
      &__desc {
        font-size: 1rem;
        white-space: pre-wrap;
        color: ${getColorCarry('secondary2_v2')};
        text-align: center;
      }
    }
  }
`
