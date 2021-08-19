import { useState } from 'react'

import cookieManager from '../managers/cookie.manager'
import { useEvent } from './event.hook'
export const useToken = () => {
  const [token, setToken] = useState(cookieManager.get('access_token'))
  useEvent('focus', () => {
    setToken(cookieManager.get('access_token'))
  })
  return token
}
