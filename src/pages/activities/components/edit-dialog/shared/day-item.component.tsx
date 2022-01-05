import React from 'react'

import { ReactComponent as CloseIcon } from '../../../../../assets/media/icons/times.svg'
import IconButton from '../../../../../components/buttons/icon-button/icon-button.component'

interface DeletableDayProps {
  name: string
  onDelete?: (id: string) => void
}

export function DeletableDay(props: DeletableDayProps) {
  const { name, onDelete } = props
  return (
    <div className="day-item">
      <span>{name}</span>
      {onDelete && (
        <IconButton onClick={onDelete ? () => onDelete('') : undefined}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  )
}
