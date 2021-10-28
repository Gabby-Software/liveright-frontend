import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    margin-bottom: -100px;
    position: relative;
    top: -85px;
  }
`

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding-bottom: 48px;

  @media ${mediaQueries.MOBILE} {
    display: block;
    padding-bottom: 0;
  }
`
export const Container = styled.div`
  height: 60px;
  background: #2e2f31;
`
