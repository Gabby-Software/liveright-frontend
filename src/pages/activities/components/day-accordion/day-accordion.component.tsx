import { PropsWithChildren, useState } from 'react'

import { CaretDownIcon } from '../../../../assets/media/icons'
import { FoodIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-accordion.styles'

interface DayAccordionProps {
  title: string
}

export default function DayAccordion({
  title,
  children
}: PropsWithChildren<DayAccordionProps>) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="DayAccordion__summary">
        <div className="DayAccordion__summary-title-container">
          <div className="DayAccordion__summary-icon">
            <FoodIcon />
          </div>

          <p className="DayAccordion__summary-title">{title}</p>
        </div>

        <IconButton
          className="DayAccordion__summary-btn"
          onClick={() => setOpen(!open)}
        >
          <CaretDownIcon />
        </IconButton>
      </div>

      {open && <div className="DayAccordion__content">{children}</div>}
    </Styles>
  )
}
