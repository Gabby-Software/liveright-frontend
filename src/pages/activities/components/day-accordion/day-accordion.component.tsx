import { PropsWithChildren, ReactNode, useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../assets/media/icons'
import { FoodIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-accordion.styles'

interface DayAccordionProps {
  title: string
  icon: ReactNode
  iconColor: string
}

export default function DayAccordion({
  title,
  children,
  iconColor,
  icon
}: PropsWithChildren<DayAccordionProps>) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open} $iconColor={iconColor}>
      <div className="DayAccordion__summary">
        <div className="DayAccordion__summary-title-container">
          <div className="DayAccordion__summary-icon">{icon}</div>

          <p className="DayAccordion__summary-title">{title}</p>
        </div>

        <div className="DayAccordion__actions">
          {open && (
            <IconButton className="DayAccordion__delete-btn">
              <DeleteOutlinedIcon />
            </IconButton>
          )}
          <IconButton
            className="DayAccordion__summary-btn"
            onClick={() => setOpen(!open)}
          >
            <CaretDownIcon />
          </IconButton>
        </div>
      </div>

      {open && <div className="DayAccordion__content">{children}</div>}
    </Styles>
  )
}
