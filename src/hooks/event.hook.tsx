import { useEffect } from 'react'
export const useEvent = (
  name: string,
  callback: (e: Event) => void,
  root: HTMLElement | Window = window
) => {
  useEffect(() => {
    root.addEventListener(name, callback)
    return () => root.removeEventListener(name, callback)
  }, [])
}
