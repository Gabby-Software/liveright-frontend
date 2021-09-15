import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { setInterval } from 'timers'

import socketManager from '../../../modules/chat/managers/socket.manager'

interface UseChatOnlineProps {
  usersSeen: Record<string, any>
  isOnline: (uuid: string) => boolean
  lastSeen: (uuid: string) => string
}

export default function useChatOnline(): UseChatOnlineProps {
  const [usersSeen, setUsersSeen] = useState<Record<string, any>>({})
  usePingChatOnline()

  const onlineListener = useCallback((e) => {
    setUsersSeen((prevState) => ({
      ...prevState,
      [e.uuid]: e.lastSeenAt
    }))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      socketManager.on('event:lastSeen:receive', onlineListener)
    }, 1000)
    return () => {
      socketManager.off('event:lastSeen:receive', onlineListener)
    }
  }, [onlineListener])

  const isOnline = (uuid: string) => {
    const minuteAgo = moment().subtract(2, 'minute')
    return usersSeen[uuid] ? moment(usersSeen[uuid]).isAfter(minuteAgo) : false
  }

  const lastSeen = (uuid: string) => {
    return usersSeen[uuid]
      ? isOnline(uuid)
        ? 'Online'
        : `Last seen ${moment(usersSeen[uuid]).fromNow()}`
      : 'Offline'
  }

  return {
    usersSeen,
    isOnline,
    lastSeen
  }
}

export function usePingChatOnline() {
  useEffect(() => {
    const interval = setInterval(() => {
      socketManager.pingLogin()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])
}
