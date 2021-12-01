import { ReactNode, useState } from 'react'

import {
  CaretDownIcon,
  DeleteOutlinedIcon
} from '../../../../assets/media/icons'
import { DragIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './sub-item-accordion.styles'

interface SubItemAccordionProps {
  content: ReactNode
  title: string
}

export default function SubItemAccordion({
  content,
  title
}: SubItemAccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Styles $open={open}>
      <div className="SubItemAccordion__summary">
        <div className="SubItemAccordion__title-container">
          <button className="SubItemAccordion__drag">
            <DragIcon />
          </button>

          <p className="SubItemAccordion__title">{title}</p>
        </div>

        <div className="SubItemAccordion__actions">
          {open && (
            <IconButton size="sm" className="SubItemAccordion__delete">
              <DeleteOutlinedIcon />
            </IconButton>
          )}
          <IconButton
            size="sm"
            className="SubItemAccordion__caret"
            onClick={() => setOpen((open) => !open)}
          >
            <CaretDownIcon />
          </IconButton>
        </div>
      </div>

      {open && <div className="SubItemAccordion__content">{content}</div>}
    </Styles>
  )
}
