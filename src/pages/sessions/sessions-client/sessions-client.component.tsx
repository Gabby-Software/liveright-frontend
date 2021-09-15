import useSessions from '../../../hooks/api/sessions/useSessions'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import DesktopSessions from './desktop-sessions/desktop-sessions.component'
import MobileSessions from './mobile-sessions/mobile-sessions.component'

export default function Sessions() {
  const isMobile = useIsMobile()

  const upcomingSessions = useSessions({
    include: 'trainer.user',
    filter: { status: 'upcoming' }
  })

  const pastSessions = useSessions({
    include: 'trainer.user',
    filter: { status: 'past' }
  })

  return isMobile ? (
    <MobileSessions
      pastSessions={pastSessions}
      upcomingSessions={upcomingSessions}
    />
  ) : (
    <DesktopSessions
      pastSessions={pastSessions}
      upcomingSessions={upcomingSessions}
    />
  )
}
