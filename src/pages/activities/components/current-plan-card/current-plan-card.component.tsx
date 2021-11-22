import { ReactNode, useState } from 'react'

import { CheckIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import { Styles } from './current-plan-card.styles'

interface CurrentPlanCardProps {
  icon: ReactNode
  time: string
  title: string
  color: string
  action: string
  actionText?: string
  content: string[]
}

export default function CurrentPlanCard({
  icon,
  time,
  title,
  color,
  action,
  actionText,
  content
}: CurrentPlanCardProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $color={color}>
      <div className="CurrentPlanCard__summary">
        <div className="CurrentPlanCard__summary-content">
          <div className="CurrentPlanCard__summary-icon">{icon}</div>

          <p className="CurrentPlanCard__summary-time">{time}</p>

          <div>
            <p className="CurrentPlanCard__summary-title">{title}</p>

            <div className="CurrentPlanCard__summary-btn-container">
              {actionText && (
                <span className="CurrentPlanCard__summary-btn-text">
                  {actionText}
                </span>
              )}
              <button
                className="CurrentPlanCard__summary-btn"
                onClick={() => setOpen(!open)}
              >
                {action}
              </button>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm">
          Log This
        </Button>
      </div>

      {open && (
        <div className="CurrentPlanCard__content">
          {content.map((text, index) => (
            <p key={index} className="CurrentPlanCard__content-item">
              <span>{text}</span>

              <CheckIcon />
            </p>
          ))}
        </div>
      )}
    </Styles>
  )
}
