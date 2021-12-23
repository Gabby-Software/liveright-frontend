import { useState } from 'react'

import { CaretDownIcon } from '../../../../assets/media/icons'
import { Styles } from './day-card-accordion.styles'

interface DayCardAccordionContentContent {
  title: string
  subtitle: string
}

interface DayCardAccordionContent {
  content: DayCardAccordionContentContent[]
}

interface DayCardAccordionProps {
  title: string
  count: string
  content: DayCardAccordionContent[]
}

export default function DayCardAccordion({
  title,
  count,
  content
}: DayCardAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles>
      <div className="DayCardAccordion__summary" onClick={() => setOpen(!open)}>
        <div>
          <p>
            {title}&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;{count}
          </p>
        </div>

        <CaretDownIcon />
      </div>

      {open && (
        <div className="DayCardAccordion__content">
          {content.map((row, index) => (
            <div className="DayCardAccordion__content-item" key={index}>
              {row.content.map((row, idx) => (
                <div className="DayCardAccordion__content-sub-item" key={idx}>
                  <p>{row.title}</p>
                  <p className="DayCardAccordion__content-item-subtitle">
                    {row.subtitle}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Styles>
  )
}
