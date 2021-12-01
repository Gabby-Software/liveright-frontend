import { ReactNode, useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './item-accordion.styles'

interface ItemAccordionProps {
  content: ReactNode
  title: string
}

export default function ItemAccordion({ content, title }: ItemAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="ItemAccordion__summary">
        <p className="ItemAccordion__summary-title">{title}</p>

        <div className="ItemAccordion__summary-actions">
          {open && (
            <IconButton size="sm" className="ItemAccordion__summary-remove-btn">
              <DeleteOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            size="sm"
            className="ItemAccordion__summary-caret"
            onClick={() => setOpen((open) => !open)}
          >
            <CaretDownIcon />
          </IconButton>
        </div>
      </div>

      {open && <div className="ItemAccordion__content">{content}</div>}
    </Styles>
  )
}
