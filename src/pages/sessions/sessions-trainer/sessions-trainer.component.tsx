/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useIsMobile } from '../../../hooks/is-mobile.hook'
import {
  ACTION_GET_CLIENTS_REQUEST,
  ACTION_TRAINER_REMOVE_SESSION_REQUEST
} from '../../../store/action-types'
import { SessionsState } from '../../../store/reducers/sessions.reducer'
import { SessionFilter, SessionStatus } from '../../../types/session.type'
import DesktopSessions from './desktop-sessions/desktop-sessions.component'
import MobileSessions from './mobile-sessions/mobile-sessions.component'

interface Props {
  sessions: SessionsState
  getSessions: (
    status: SessionStatus
  ) => (page: number, filter?: SessionFilter) => void
}

const Sessions: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { getSessions, sessions } = props
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const handleRemoveSession = (id: number) => {
    dispatch({
      type: ACTION_TRAINER_REMOVE_SESSION_REQUEST,
      payload: { id }
    })
  }

  useEffect(() => {
    dispatch({
      type: ACTION_GET_CLIENTS_REQUEST,
      payload: { status: 'active' }
    })
    getSessions('awaiting_scheduling')(1)
  }, [])

  if (isMobile) {
    return (
      <MobileSessions
        getSessions={getSessions}
        onRemoveSession={handleRemoveSession}
        sessions={sessions}
      />
    )
  }

  return (
    <DesktopSessions
      getSessions={getSessions}
      onRemoveSession={handleRemoveSession}
      sessions={sessions}
    />
  )
}

export default Sessions
