import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { UploadIcon } from '../../../../assets/media/icons'
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

  return (
    <DropStyles {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <Image
          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
          className="drop__image"
        />
      ) : (
        <>
          <UploadIcon />
          <p className="drop__text">Select/drag photo here</p>
        </>
      )}
    </DropStyles>
  )
}
