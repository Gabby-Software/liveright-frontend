import { UploadIcon } from '../../../../assets/media/icons'
import { Subtitle } from '../../../../components/typography'
import { Styles } from './photo-form.styles'

export default function PhotoForm() {
  return (
    <Styles>
      <div>
        <Subtitle size="sm" className="photo-form__label">
          Front Photo
        </Subtitle>

        <Drop />
      </div>

      <div>
        <Subtitle size="sm" className="photo-form__label">
          Side Photo
        </Subtitle>

        <Drop />
      </div>

      <div>
        <Subtitle size="sm" className="photo-form__label">
          Back Photo
        </Subtitle>

        <Drop />
      </div>
    </Styles>
  )
}

function Drop() {
  return (
    <div className="photo-form__drop">
      <UploadIcon />
      <p className="photo-form__drop-text">Select/drag photo here</p>
    </div>
  )
}
