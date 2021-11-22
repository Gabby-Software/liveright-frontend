import { Styles } from './current-plan-overview-card.styles'

interface CurrentPlanOverviewCardProps {
  title: string
  name: string
}

export default function CurrentPlanOverviewCard({
  title,
  name
}: CurrentPlanOverviewCardProps) {
  return (
    <Styles>
      <p className="CurrentPlanOverviewCard__title">{title}</p>
      <p className="CurrentPlanOverviewCard__name">{name}</p>

      <p className="CurrentPlanOverviewCard__action">Edit</p>
    </Styles>
  )
}
