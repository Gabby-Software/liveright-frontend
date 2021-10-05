import styled from 'styled-components'

import Card from '../../../../components/card/card.style'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Wrapper = styled.div``

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  @media ${mediaQueries.TABLET} {
    width: 100%;
  }

  form {
    display: flex;
    align-items: center;
  }
`

export const TableWrapper = styled(Card)<{ isMobile?: boolean }>`
  margin-bottom: 32px;
`
