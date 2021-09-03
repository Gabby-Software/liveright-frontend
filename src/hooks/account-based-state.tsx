import { Dispatch, useEffect, useState } from 'react'

import { useAuth } from './auth.hook'

export function useAccountBasedState<G>(
  initialState: G,
  storedKey: string
): [G, Dispatch<G>] {
  const { uuid } = useAuth()
  const key = `${uuid}-${storedKey}`
  const storedState = localStorage.getItem(key)
  const [state, setState] = useState<G>(
    storedState ? JSON.parse(storedState) : initialState
  )
  useEffect(() => {
    const key = `${uuid}-${storedKey}`
    const storedState = localStorage.getItem(key)
    console.log('stored-value', uuid, storedState)
    setState(storedState ? JSON.parse(storedState) : initialState)
  }, [uuid])
  const update: Dispatch<G> = (newState: G) => {
    const key = `${uuid}-${storedKey}`
    console.log('update-stored-value', uuid, newState)
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }
  return [state, update]
}
