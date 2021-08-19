import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import userTypes from '../../enums/user-types.enum'
import { useClient } from '../../hooks/client.hook'
import { ACTION_GET_FULL_CLIENT_REQUEST } from '../../store/action-types'
import { TrainerContext } from '../trainer/trainer.context'

export const ClientProfileProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const { id } = useParams<any>()
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  const data = useClient()
  useEffect(() => {
    dispatch({ type: ACTION_GET_FULL_CLIENT_REQUEST, payload: id })
  }, [])
  const val = useMemo(() => {
    const account = data?.data?.accounts?.find(
      (acc) => acc.type === userTypes.CLIENT
    )
    return {
      ...data,
      data: data.data
        ? {
            ...data.data,
            ...account?.profile,
            ...account?.addresses
          }
        : null,
      sessions: 0,
      invoices: 0,
      editMode,
      setEditMode
    }
  }, [data, editMode])
  return (
    <TrainerContext.Provider value={val}>{children}</TrainerContext.Provider>
  )
}
