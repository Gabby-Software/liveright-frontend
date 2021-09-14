import { RefObject, useCallback } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

interface UseScrollBottomListener {
  scrollRef: RefObject<any>
}

interface UseScrollBottomListenerConfig {
  callback?: any
}

export default function useScrollBottomListener(
  config: UseScrollBottomListenerConfig = {}
): UseScrollBottomListener {
  const { callback } = config

  const handleScrollToBottom = useCallback(() => {
    if (callback) {
      callback()
    }
  }, [callback])

  const scrollRef = useBottomScrollListener(handleScrollToBottom, {
    debounce: 200
  })

  return {
    scrollRef
  }
}
