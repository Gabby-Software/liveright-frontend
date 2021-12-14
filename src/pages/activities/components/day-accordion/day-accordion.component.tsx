import { PropsWithChildren, ReactNode, useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-accordion.styles'

interface DayAccordionProps {
  title: string
  icon: ReactNode
  iconColor: string
  onRemove: any
  error?: string
  defaultOpen?: boolean
}

export default function DayAccordion({
  title,
  children,
  iconColor,
  icon,
  onRemove,
  error,
  defaultOpen
}: PropsWithChildren<DayAccordionProps>) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <Styles $open={open} $iconColor={iconColor} $error={error}>
      <div className="DayAccordion__summary">
        <div className="DayAccordion__summary-title-container">
          <div className="DayAccordion__summary-icon">{icon}</div>

          <p className="DayAccordion__summary-title">{title}</p>
        </div>

        <div className="DayAccordion__actions">
          <IconButton className="DayAccordion__delete-btn" onClick={onRemove}>
            <DeleteOutlinedIcon />
          </IconButton>
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
