import { Styles, Text } from './styles'

interface PlaceholderProps {
  spacing?: boolean
}

export function LoadingPlaceholder({ spacing }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>Loading...</Text>
    </Styles>
  )
}

export function EmptyPlaceholder({ spacing }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>No data</Text>
    </Styles>
  )
}
