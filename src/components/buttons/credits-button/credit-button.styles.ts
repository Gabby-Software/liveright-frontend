import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColor, getColorCarry } from '../../../pipes/theme-color.pipe'
import Button from '../button/button.component'

export default styled(Button)<any>`
  display: flex;
  align-items: center;
  border-color: ${getBgColor};
  background-color: ${getBgColor};
  color: ${getColorCarry('dark_v2')};
  font-weight: 400;
  width: 250px;
  justify-content: space-between;
  padding: 11px 24px;

  &:hover,
  &:focus {
    background-color: ${getBgColor};
    color: ${getColorCarry('dark_v2')};
    border-color: ${getColorCarry('dark_v2')};
  }

  .credits-btn {
    &__items {
      display: flex;
      align-items: center;

      & svg {
        margin-right: 0.625rem;
      }
    }

    &__count {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${(props) =>
        props.$off
          ? getColor(props, 'primary_v2')
          : getColor(props, 'green_90')};
    }
  }

  @media ${mediaQueries.MOBILE} {
    font-size: 0.875rem;
  }
`

function getBgColor(props: any): string {
  switch (props.$color) {
    case 'secondary':
      return getColor(props, 'background')
    default:
      return '#fff'
  }
}
