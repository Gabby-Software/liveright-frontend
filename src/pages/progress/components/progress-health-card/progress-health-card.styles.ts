import styled, { css } from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

const noLogsStyles = css`
  border: 1px solid ${getColorCarry('link')};
  background-color: ${getColorCarry('link_bg')};
  color: ${getColorCarry('primaryDark_v2')};

  .health-card {
    &__content {
      padding-left: 0;
    }
  }

  svg {
    order: 2;
    ${media('tablet', 'max')`
      order: 0;
    `}
  }
`

export const StyledCard = styled(Card)<any>`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #fff;
  user-select: none;
  background-color: ${getColorCarry('primaryDark_v2')};

  &:last-child {
    margin-right: 0;
  }

  @media ${mediaQueries.MOBILE} {
    flex-direction: column;
  }

  svg {
    display: block;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .health-card {
    &__content {
      flex: 1;
      text-align: left;
      padding-left: 1.5rem;
    }

    &__btn {
      padding: 0;

      & svg {
        width: 6px;
        margin-left: 0.5rem;
      }
    }
  }

  ${({ noLogs }) => (noLogs ? noLogsStyles : '')}

  @media ${mediaQueries.MOBILE} {
    .health-card {
      &__content {
        padding-left: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`

export const Quality = styled.p`
  color: ${getColorCarry('neutral_50')};
  margin-bottom: 0.25rem;
`

export const Data = styled.p`
  font-size: 1rem;
  font-weight: 400;
`
