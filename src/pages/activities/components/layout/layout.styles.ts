import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0;
  min-height: 100%;

  .ActivitiesLayout {
    &__user {
      margin-top: 0.9375rem;
      border-radius: 14px;
      width: 100%;
    }

    &__content {
      margin: 0;
      border-radius: 14px;
      flex-grow: 1;
      background-color: ${getColorCarry('white')};
    }
  }
`
