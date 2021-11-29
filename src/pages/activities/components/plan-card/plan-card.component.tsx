import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Styles } from './plan-card.styles'

interface PlanCardProps {
  plan: any
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <Styles>
      <div className="PlanCard__header">
        <div>
          <p className="PlanCard__name">{plan.name}</p>
          <p className="PlanCard__subtitle">
            <span>Client:</span> {plan.client}
          </p>
        </div>

        <StatusBadge status={plan.status.toLowerCase()}>
          {plan.status}
        </StatusBadge>
      </div>

      <div className="PlanCard__info">
        <div>
          <p className="PlanCard__row-title">Days</p>
          <p className="PlanCard__row-value">{plan.days}</p>
        </div>
        {plan.start && (
          <div>
            <p className="PlanCard__row-title">Start</p>
            <p className="PlanCard__row-value">{plan.start}</p>
          </div>
        )}
        {plan.end && (
          <div>
            <p className="PlanCard__row-title">Start</p>
            <p className="PlanCard__row-value">{plan.end}</p>
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
