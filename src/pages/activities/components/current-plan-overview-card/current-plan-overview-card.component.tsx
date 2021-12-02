import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './current-plan-overview-card.styles'

interface CurrentPlanOverviewCardProps {
  title: string
  name: string
}

export default function CurrentPlanOverviewCard({
  title,
  name
}: CurrentPlanOverviewCardProps) {
  const isMobile = useIsMobile()
  const content = (
    <>
      <p className="CurrentPlanOverviewCard__title">{title}</p>
      <p className="CurrentPlanOverviewCard__name">{name}</p>
    </>
  )
  return (
    <Styles>
      {isMobile ? <div>{content}</div> : content}

      <p className="CurrentPlanOverviewCard__action">Edit</p>
    </Styles>
  )
}
