import { InfoIcon } from '../../../../assets/media/icons'
import { Styles } from './alert.styles'

interface AlertProps {
  className?: string
  content: string | JSX.Element
}

export default function Alert({ className, content }: AlertProps) {
  return (
    <Styles className={className}>
      <div className="Alert__icon">
        <InfoIcon />
      </div>

      <div className="Alert__body">{content}</div>
    </Styles>
  )
}
