import { Link } from 'react-router-dom'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { Styles } from './current-plan-overview-card.styles'

interface CurrentPlanOverviewCardProps {
  title: string
  noName: boolean
  name: string
  link: string
}

export default function CurrentPlanOverviewCard({
  title,
  noName,
  name,
  link
}: CurrentPlanOverviewCardProps) {
  const isMobile = useIsMobile()
  const content = (
    <>
      <p className="CurrentPlanOverviewCard__title">Active {title}</p>
      <div className="CurrentPlanOverviewCard__name">
        {noName ? (
          <>
            {`You don't have an active ${title}. Create a `}{' '}
            <Link to={link}>{title}</Link>
          </>
        ) : (
          name
        )}
      </div>
    </>
  )
  return (
    <Styles>
      {isMobile ? <div>{content}</div> : content}

      <Link to={link} className="CurrentPlanOverviewCard__action">
        Edit
      </Link>
    </Styles>
  )
}
