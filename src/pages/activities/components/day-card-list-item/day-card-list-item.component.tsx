import { Styles } from './day-card-list-item.styles'

interface DayCardListItemProps {
  title: string
  onClick?: () => void
}

export default function DayCardListItem({ title }: DayCardListItemProps) {
  return (
    <Styles>
      <span>{title}</span>
    </Styles>
  )
}
