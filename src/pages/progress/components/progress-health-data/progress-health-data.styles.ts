import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export const Wrapper = styled.div`
  .select_input__wrapper {
    width: 250px;
  }
  .today-highlights {
    display: flex;
    align-items: center;
  }
`
export const HighlightArrow = styled.span<{ disabled: boolean }>`
  transition: ${(p) => p.theme.vars.defaults.transition};
  cursor: pointer;
  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0;
    pointer-events: none;
    touch-action: none;
  `
      : ''};
  &:first-child {
    margin-right: 6px;
  }
  &:last-child {
    margin-left: 6px;
    transform: scaleX(-1);
  }
  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`
export const CardsWrapper = styled.div`
  margin-bottom: 32px;
  padding: 8px 0;
  display: flex;
  ${media('tablet', 'max')`
      flex-wrap: wrap;
  `}
`
