import { useEffect, useState } from 'react'

import { addFailedImage, checkFailedImage } from '../../utils/api/images'

interface ImageProps {
  src?: string
  className?: string
}

export default function Image({ src, className }: ImageProps) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (src) {
      setUrl(src)
    }
  }, [src])

  const handleFail = () => {
    addFailedImage(url)
    setUrl('')
  }

  if (!url) {
    return null
  }

  return (
    <img
      src={!checkFailedImage(url) ? url : ''}
      alt=""
      onError={handleFail}
      className={className}
    />
  )
}
