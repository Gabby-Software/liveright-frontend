import { useEffect, useRef } from 'react'
import { useFormState } from 'react-hook-form'
import { useHistory } from 'react-router'

interface UseFormLock {
  onUnlock: () => void
}

export default function useFormLock(
  control: any,
  onOpenDialog: any,
  onRedirectTo: any
): UseFormLock {
  const { isDirty } = useFormState({ control })
  const history = useHistory()
  const unblock = useRef<any>()

  useEffect(() => {
    if (isDirty) {
      unblock.current = history.block((location) => {
        onRedirectTo(location.pathname)
        onOpenDialog()
        return false
      })

      return () => {
        unblock.current?.()
      }
    } else {
      unblock.current?.()
    }
  }, [isDirty])

  const onUnlock = () => {
    unblock.current?.()
  }

  return {
    onUnlock
  }
}
