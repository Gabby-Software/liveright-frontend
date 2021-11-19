import { PropsWithChildren } from 'react'

import { CaretLeftIcon } from '../../../assets/media/icons'
import { Styles } from './go-back.styles'

interface GoBackProps {
  className?: string
  onClick?: any
  spacing?: number
}

export default function GoBack({
  children,
  onClick,
  className,
  spacing
}: PropsWithChildren<GoBackProps>) {
  return (
    <Styles className={className} onClick={onClick} $spacing={spacing}>
      <CaretLeftIcon />
      {children}
    </Styles>
  )
}
