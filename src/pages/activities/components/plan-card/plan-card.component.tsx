import moment from 'moment'

import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import { Styles } from './plan-card.styles'

interface PlanCardProps {
  plan: any
  to: string
}

export default function PlanCard({ plan, to }: PlanCardProps) {
  const status = plan.status
  const scheduled =
    plan.status === 'scheduled' ||
    plan.status === 'active' ||
    plan.status === 'inactive'

  const planInfo = (
    <>
      {plan.training_plan && (
        <div>
          <p className="PlanCard__row-title">Training plan</p>
          <p className="PlanCard__row-value">{plan.training_plan.name}</p>
        </div>
      )}
      {plan.diet_plan && (
        <div>
          <p className="PlanCard__row-title">Diet plan</p>
          <p className="PlanCard__row-value">{plan.diet_plan.name}</p>
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
            <span>Client:</span> {plan.client || '-'}
          </p>
        </div>

        <StatusBadge status={status.toLowerCase()}>
          {capitalize(status)}
        </StatusBadge>
      </div>

      <div className="PlanCard__info">
        <div>
          <p className="PlanCard__row-title">Days</p>
          <p className="PlanCard__row-value">{plan.days || '-'}</p>
        </div>
        {scheduled ? (
          <>
            {plan.scheduled_start_on && (
              <div>
                <p className="PlanCard__row-title">Start</p>
                <p className="PlanCard__row-value">
                  {moment(new Date(plan.scheduled_start_on)).format(
                    DATE_RENDER_FORMAT
                  )}
                </p>
              </div>
            )}
            {plan.scheduled_end_on && (
              <div>
                <p className="PlanCard__row-title">End</p>
                <p className="PlanCard__row-value">
                  {moment(new Date(plan.scheduled_end_on)).format(
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
