import { ReactNode, useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../assets/media/icons'
import { DragIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './item-accordion.styles'

interface ItemAccordionProps {
  content: ReactNode
  title: string
  dragHandleProps?: any
  onRemove?: boolean
  iconDesc?: string
  divider?: boolean
}

export default function ItemAccordion({
  content,
  title,
  dragHandleProps,
  iconDesc,
  divider,
  onRemove
}: ItemAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="ItemAccordion__summary">
        <div className="ItemAccordion__summary-title-container">
          <button className="ItemAccordion__drag" {...dragHandleProps}>
            <DragIcon />
          </button>

          <p className="ItemAccordion__summary-title">{title}</p>
        </div>

        <div className="ItemAccordion__summary-actions">
          {onRemove && (
            <IconButton
              size="sm"
              className="ItemAccordion__summary-remove-btn"
              onClick={onRemove}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          )}

          {iconDesc && (
            <span className="ItemAccordion__summary-desc">{iconDesc}</span>
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
      {divider && <div className="ItemAccordion__divider" />}
    </Styles>
  )
}
