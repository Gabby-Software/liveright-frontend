import { Styles, Text } from './styles'

interface PlaceholderProps {
  spacing?: boolean
  text?: string
}

export function LoadingPlaceholder({ spacing }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>Loading...</Text>
    </Styles>
  )
}

export function EmptyPlaceholder({ spacing, text }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>{text || 'No data'}</Text>
    </Styles>
  )
}
