import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import Link from '../../components/link/link.component'
import { Routes } from '../../enums/routes.enum'
import { useClient } from '../../hooks/client.hook'
import { useTitle } from '../../hooks/title.hook'
import { useTitleContent } from '../../layouts/desktop-layout/desktop-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { ACTION_GET_CLIENT_MINIMAL_REQUEST } from '../../store/action-types'
import { ActionStyle } from './client.styles'

type Props = {}
const Client = ({}: Props) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { data: client } = useClient()
  useEffect(() => {
    dispatch({ type: ACTION_GET_CLIENT_MINIMAL_REQUEST, payload: id })
  }, [])
  useTitle(`Viewing ${client?.first_name || ''} ${client?.last_name || ''}`)
  useTitleContent(
    <ActionStyle>
      <Link to={`${Routes.CLIENTS}/${id}${Routes.PROFILE}`}>
        {t('clients:view-profile')}
      </Link>
    </ActionStyle>
  )
  return null
}

export default Client
