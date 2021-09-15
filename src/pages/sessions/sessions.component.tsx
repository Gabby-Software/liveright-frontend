import React from 'react'

import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import ClientSessions from './sessions-client/sessions-client.component'
import TrainerSessions from './sessions-trainer/sessions-trainer.component'

export default function Sessions() {
  const auth = useAuth()
  return auth.type === userTypes.CLIENT ? (
    <ClientSessions />
  ) : (
    <TrainerSessions />
  )
}
