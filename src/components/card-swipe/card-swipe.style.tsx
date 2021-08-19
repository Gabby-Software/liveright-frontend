import styled from 'styled-components'

import Card from '../card/card.style'

export const Wrapper = styled.div`
  position: relative;
`

export const CardStyled = styled(Card)`
  position: absolute;
  z-index: 2;
`

export const SwipeContentWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  height: 100%;
`
