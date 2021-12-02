import { ReactNode, useState } from 'react'

import { CheckIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import { Styles } from './current-plan-accordion.styles'

interface CurrentPlanAccordionProps {
  icon: ReactNode
  time: string
  title: string
  color: string
  action: string
  actionText?: string
  content: string[]
}

export default function CurrentPlanAccordion({
  icon,
  time,
  title,
  color,
  action,
  content
}: CurrentPlanAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $color={color}>
      <div
        className="CurrentPlanAccordion__summary"
        onClick={() => setOpen((open) => !open)}
      >
        <div className="CurrentPlanAccordion__header">
          <div className="CurrentPlanAccordion__icon">{icon}</div>

          <div>
            <p className="CurrentPlanAccordion__title">{title}</p>
            <p className="CurrentPlanAccordion__action">{action}</p>
          </div>
        </div>

        <div className="CurrentPlanAccordion__cta">
          <span className="CurrentPlanAccordion__time">{time}</span>

          <Button variant="secondary" size="sm">
            Log This
          </Button>
        </div>
      </div>

      {open && (
        <div className="CurrentPlanAccordion__content">
          {content.map((row, index) => (
            <p key={index} className="CurrentPlanAccordion__content-row">
              <span>{row}</span>
              <CheckIcon />
            </p>
          ))}
        </div>
      )}
    </Styles>
  )
}
