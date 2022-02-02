import { AddIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-card-list-item.styles'

interface DayCardListItemProps {
  title: string
  onClick?: () => void
}

export default function DayCardListItem({
  title,
  onClick
}: DayCardListItemProps) {
  return (
    <Styles>
      <span>{title}</span>

      <IconButton size="sm" onClick={onClick}>
        <AddIcon />
      </IconButton>
    </Styles>
  )
}
