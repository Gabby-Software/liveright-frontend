import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { CrossIcon, UploadIcon } from '../../../../assets/media/icons'
import Image from '../../../../components/image/image.component'
import { Subtitle } from '../../../../components/typography'
import { DropStyles, Styles } from './photo-form.styles'

interface PhotoFormProps {
  front?: any
  side?: any
  back?: any
  onChange: (name: string, file: any) => void
}

export default function PhotoForm({
  front,
  side,
  back,
  onChange
}: PhotoFormProps) {
  return (
    <Styles>
      <div>
        <Subtitle size="sm" className="photo-form__label">
          Front Photo
        </Subtitle>

        <Drop
          file={front}
          onChange={(file) => onChange('images.front', file)}
        />
      </div>

      <div>
        <Subtitle size="sm" className="photo-form__label">
          Side Photo
        </Subtitle>

        <Drop file={side} onChange={(file) => onChange('images.side', file)} />
      </div>

      <div>
        <Subtitle size="sm" className="photo-form__label">
          Back Photo
        </Subtitle>

        <Drop file={back} onChange={(file) => onChange('images.back', file)} />
      </div>
    </Styles>
  )
}

interface DropProps {
  file?: any
  onChange?: (file: any) => void
}

function Drop({ file, onChange }: DropProps) {
  const onDrop = useCallback((files) => {
    onChange && files[0] && onChange(files[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  })

  const fileUrl = getFileUrl(file)

  return (
    <DropStyles>
      <div className="drop__container" {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <Image src={fileUrl} className="drop__image" />
        ) : (
          <>
            <UploadIcon />
            <p className="drop__text">Select/drag photo here</p>
          </>
        )}
      </div>

      {file && !(typeof file === 'string' && file.includes('https://')) && (
        <p className="drop__remove" onClick={() => onChange?.(null)}>
          <CrossIcon />
          Remove
        </p>
      )}
    </DropStyles>
  )
}

function getFileUrl(file: any) {
  try {
    if (!file) {
      return ''
    }

    return typeof file === 'string' ? file : URL.createObjectURL(file)
  } catch (e) {
    return ''
  }
}
