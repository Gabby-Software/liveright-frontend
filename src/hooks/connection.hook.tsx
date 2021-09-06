import { useState } from 'react'

import { useEvent } from './event.hook'
export const useConnection = () => {
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine)
  useEvent('online', () => setIsOnline(true))
  useEvent('offline', () => setIsOnline(false))
  return isOnline
}
