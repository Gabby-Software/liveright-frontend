import { useEffect, useState } from 'react'

interface UseImage {
  src: string
  onError: () => void
}

export default function useImage(img?: string): UseImage {
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (img) {
      setSrc(img)
    }
  }, [img])

  const onError = () => {
    setSrc('')
  }

  return {
    src,
    onError
  }
}
