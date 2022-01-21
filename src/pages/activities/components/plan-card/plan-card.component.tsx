import moment from 'moment'

import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { getActiveOrLatestRev } from '../../../../utils/api/activities'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { Styles } from './plan-card.styles'

interface PlanCardProps {
  plan: any
  to: string
}

export default function PlanCard({ plan, to }: PlanCardProps) {
  const latestRev = getActiveOrLatestRev(plan)
  const status = latestRev?.status
  const scheduled =
    status === 'scheduled' || status === 'active' || status === 'inactive'

  const planInfo = (
    <>
      {latestRev?.training_plan && (
        <div>
          <p className="PlanCard__row-title">Training plan</p>
          <p className="PlanCard__row-value">{latestRev?.training_plan.name}</p>
        </div>
      )}
      {latestRev?.diet_plan && (
        <div>
          <p className="PlanCard__row-title">Diet plan</p>
          <p className="PlanCard__row-value">{latestRev?.diet_plan.name}</p>
        </div>
      )}
    </>
  )
  return (
    <Styles to={to}>
      <div className="PlanCard__header">
        <div>
          <p className="PlanCard__name">{plan.name}</p>
          <p className="PlanCard__subtitle">
            <span>Client:</span>{' '}
            {plan.account
              ? [plan.account?.user?.first_name, plan.account?.user?.last_name]
                  .filter(Boolean)
                  .join(' ') || '-'
              : '-'}
          </p>
        </div>

        <StatusBadge status={status.toLowerCase()}>
          {capitalize(status)}
        </StatusBadge>
      </div>

      <div className="PlanCard__info">
        <div>
          <p className="PlanCard__row-title">Days</p>
          <p className="PlanCard__row-value">{latestRev?.days_count}</p>
        </div>
        {scheduled ? (
          <>
            {latestRev?.scheduled_start_on && (
              <div>
                <p className="PlanCard__row-title">Start</p>
                <p className="PlanCard__row-value">
                  {moment(new Date(latestRev?.scheduled_start_on)).format(
                    DATE_RENDER_FORMAT
                  )}
                </p>
              </div>
            )}
            {latestRev?.scheduled_end_on && (
              <div>
                <p className="PlanCard__row-title">End</p>
                <p className="PlanCard__row-value">
                  {moment(new Date(latestRev?.scheduled_end_on)).format(
                    DATE_RENDER_FORMAT
                  )}
                </p>
              </div>
            )}
          </>
        ) : (
          planInfo
        )}
      </div>

      {scheduled && <div className="PlanCard__info">{planInfo}</div>}
    </Styles>
  )
}
