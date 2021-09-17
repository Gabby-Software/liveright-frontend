import React from 'react'
import { useLocation } from 'react-router'

import useSessions from '../../../hooks/api/sessions/useSessions'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { parseQuery } from '../../../utils/query'
import DesktopSessions from './desktop-sessions/desktop-sessions.component'
import MobileSessions from './mobile-sessions/mobile-sessions.component'

export default function Sessions() {
  const isMobile = useIsMobile()
  const location = useLocation()
  const query = parseQuery(location.search)

  const sessions = useSessions({
    include: 'client.user',
    filter: {
      status: query.upcoming ? 'upcoming' : 'awaiting_scheduling'
    }
  })

  return isMobile ? (
    <MobileSessions {...sessions} />
  ) : (
    <DesktopSessions {...sessions} />
  )
}
