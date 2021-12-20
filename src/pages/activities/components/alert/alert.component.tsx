import { InfoIcon } from '../../../../assets/media/icons'
import { Styles } from './alert.styles'

interface AlertProps {
  className?: string
  title?: string
  content: string | JSX.Element
}

export default function Alert({ className, title, content }: AlertProps) {
  return (
    <Styles className={className}>
      <div className="Alert__header">
        <div className="Alert__icon">
          <InfoIcon />
        </div>
        {title && (
          <div className="Alert__title">
            {title}
          </div>
        )}
      </div>

      <div className="Alert__body">{content}</div>
    </Styles>
  )
}
