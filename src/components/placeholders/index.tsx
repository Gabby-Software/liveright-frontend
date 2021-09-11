import { Styles, Text } from './styles'

export function LoadingPlaceholder() {
  return (
    <Styles>
      <Text>Loading...</Text>
    </Styles>
  )
}

export function EmptyPlaceholder() {
  return (
    <Styles>
      <Text>No data</Text>
    </Styles>
  )
}
