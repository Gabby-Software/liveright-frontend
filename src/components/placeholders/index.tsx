import { WorkoutIcon } from '../../assets/media/icons/activities'
import { Styles, Text } from './styles'
interface PlaceholderProps {
  spacing?: boolean
  text?: string
  action?: JSX.Element
}

export function LoadingPlaceholder({ spacing }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>Loading...</Text>
    </Styles>
  )
}

export function EmptyPlaceholder({ spacing, text, action }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <div className="content">
        <WorkoutIcon />
        <Text>{text || 'No data'}</Text>
        {action}
      </div>
    </Styles>
  )
}
