import { InfoIcon } from '../../../../assets/media/icons'
import { Styles } from './alert.styles'

export default function Alert() {
  return (
    <Styles>
      <div className="Alert__icon">
        <InfoIcon />
      </div>

      <div className="Alert__body">
        <p className="Alert__text">
          This training plan is currently used on a training split. If you make
          changes, these will reflect on your training split.
        </p>
        <button className="Alert__action">Unlink</button>
      </div>
    </Styles>
  )
}
