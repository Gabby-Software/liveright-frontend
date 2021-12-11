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
  return (
    <Styles to={to}>
      <div className="PlanCard__header">
        <div>
          <p className="PlanCard__name">{plan.name}</p>
          <p className="PlanCard__subtitle">
            <span>Client:</span> {plan.client || '-'}
          </p>
        </div>

        <StatusBadge status={plan.status.toLowerCase()}>
          {capitalize(plan.status)}
        </StatusBadge>
      </div>

      <div className="PlanCard__info">
        <div>
          <p className="PlanCard__row-title">Days</p>
          <p className="PlanCard__row-value">{plan.days || '-'}</p>
        </div>
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
            <p className="PlanCard__row-title">Start</p>
            <p className="PlanCard__row-value">
              {moment(new Date(plan.scheduled_end_on)).format(
                DATE_RENDER_FORMAT
              )}
            </p>
          </div>
        )}
        {plan.training_plan && (
          <div>
            <p className="PlanCard__row-title">Training plan</p>
            <p className="PlanCard__row-value">{plan.training_plan}</p>
          </div>
        )}
        {plan.diet_plan && (
          <div>
            <p className="PlanCard__row-title">Diet plan</p>
            <p className="PlanCard__row-value">{plan.diet_plan}</p>
          </div>
        )}
      </div>
    </Styles>
  )
}
