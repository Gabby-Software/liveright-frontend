import React from 'react'
import { useDispatch } from 'react-redux'

import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useSessions } from '../../hooks/sessions.hook'
import { ACTION_GET_SESSIONS_REQUEST } from '../../store/action-types'
import { SessionFilter, SessionStatus } from '../../types/session.type'
import ClientSessions from './sessions-client/sessions-client.component'
import TrainerSessions from './sessions-trainer/sessions-trainer.component'

const Sessions = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const { data } = useSessions()

  const getSessions =
    (include: string) =>
    (status: SessionStatus) =>
    (page: number, filters?: SessionFilter) => {
      dispatch({
        type: ACTION_GET_SESSIONS_REQUEST,
        payload: {
          filters: { ...filters, status },
          include,
          page
        }
      })
    }

  if (auth.type === userTypes.CLIENT) {
    return (
      <ClientSessions
        sessions={data}
        getSessions={getSessions('trainer.user')}
      />
    )
  }

  return (
    <TrainerSessions sessions={data} getSessions={getSessions('client.user')} />
  )
}

export default Sessions
