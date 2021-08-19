import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import InvitationManager from '../../../managers/invitation.manager'
import logger from '../../../managers/logger.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { serverError } from '../../../pipes/server-error.pipe'

enum states {
  NONE,
  SUCCESS,
  ERROR
}

const AcceptInvitation = () => {
  const { id } = useParams<{ id: string }>()
  const [state, setState] = useState(states.NONE)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()
  useEffect(() => {
    const query = new URLSearchParams(document.location.search)
    const expires = query.get('expires')
    const signature = query.get('signature')
    if (!(id && expires && signature)) {
      return setState(states.ERROR)
    }
    InvitationManager.acceptInvitation(id, expires, signature)
      .then((res) => {
        logger.success('INVITATION SUCCESS', res)
        setState(states.SUCCESS)
      })
      .catch((e) => {
        toast.show({ type: 'error', msg: serverError(e) })
        setState(states.ERROR)
      })
  }, [])
  if (state === states.SUCCESS) return <Redirect to={Routes.HOME} />
  if (state === states.ERROR) return <Redirect to={Routes.HOME} />
  return null
}

export default AcceptInvitation
