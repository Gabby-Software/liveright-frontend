import { useState } from 'react'

import { throttle } from '../pipes/throttle.pipe'
import { useEvent } from './event.hook'
export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(window.scrollY)
  const setter = throttle(() => setScrollY(window.scrollY), 60)
  useEvent('scroll', () => setter.next())
  return scrollY
}
