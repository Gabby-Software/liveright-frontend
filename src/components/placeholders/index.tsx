import { WorkoutIcon } from '../../assets/media/icons/activities'
import { Styles, Text } from './styles'
interface PlaceholderProps {
  spacing?: boolean
  text?: string
  action?: JSX.Element
  icon?: boolean
}

export function LoadingPlaceholder({ spacing }: PlaceholderProps) {
  return (
    <Styles $spacing={spacing}>
      <Text>Loading...</Text>
    </Styles>
  )
}

export function EmptyPlaceholder({
  spacing,
  text,
  action,
  icon
}: PlaceholderProps) {
  return (
    <Styles $spacing={spacing} $icon={icon}>
      <div className="content">
        {icon && <WorkoutIcon />}
        <Text>{text || 'No data'}</Text>
        {action}
      </div>
    </Styles>
  )
}
