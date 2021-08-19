import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { useClient } from '../../hooks/client.hook'
import { useTitle } from '../../hooks/title.hook'
import { ACTION_GET_CLIENT_MINIMAL_REQUEST } from '../../store/action-types'

type Props = {}
const ClientHub = ({}: Props) => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const { data: client } = useClient()
  useEffect(() => {
    dispatch({ type: ACTION_GET_CLIENT_MINIMAL_REQUEST, payload: id })
  }, [])
  useTitle(`Viewing ${client?.first_name || ''} ${client?.last_name || ''}`)
  return null
}

export default ClientHub
