import { useEffect, useRef } from 'react'
import { useFormState } from 'react-hook-form'
import { useHistory } from 'react-router'

interface UseTraningPlanFormLock {
  onUnlock: () => void
}

export default function useTraningPlanFormLock(
  control: any,
  onOpenDialog: any,
  onRedirectTo: any
): UseTraningPlanFormLock {
  const { isDirty } = useFormState({ control })
  const history = useHistory()
  const unblock = useRef<any>()

  console.log(isDirty)

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
