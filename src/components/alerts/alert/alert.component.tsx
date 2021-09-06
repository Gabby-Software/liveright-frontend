import { InfoIcon } from '../../../assets/media/icons'
import Styles from './alert.styles'

interface AlertProps {
  message: string
  className?: string
}

export default function Alert({ message, className }: AlertProps) {
  return (
    <Styles className={className}>
      <InfoIcon />
      <span>{message}</span>
    </Styles>
  )
}
