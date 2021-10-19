import styled from 'styled-components'

export default styled.div``

export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`
