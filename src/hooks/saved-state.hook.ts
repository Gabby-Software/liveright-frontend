import { Dispatch, useCallback, useState } from 'react'

export function useSavedState<G>(initialValue: G, key: string) {
  const savedData = localStorage.getItem(key)
  const [state, setState] = useState<G>(
    savedData ? JSON.parse(savedData) : initialValue
  )
  const update: Dispatch<G> = useCallback((value: G) => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }, [])
  return [state, update]
}
