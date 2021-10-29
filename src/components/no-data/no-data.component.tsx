import styled from 'styled-components'

const Container = styled.div<any>`
  width: 100%;
  height: ${(props) =>
    typeof props.height === 'string' ? props.height : `${props.height}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.989916px solid #ededed;
  border-radius: 12px;
`

interface NoDataProps {
  children: JSX.Element | JSX.Element[]
  height: number | string
}

export const NoData = ({ children, height }: NoDataProps) => {
  return (
    <Container className="no-data" height={height}>
      {children}
    </Container>
  )
}
