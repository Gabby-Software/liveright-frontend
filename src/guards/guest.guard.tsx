import React from 'react'
import { Redirect } from 'react-router-dom'

import { Routes } from '../enums/routes.enum'
import { useAuth } from '../hooks/auth.hook'

export const onlyGuest =
  (Component: React.ComponentType<any>) => (props: any) => {
    const auth = useAuth()
    if (auth.uuid && auth.email_verified_at)
      return <Redirect to={Routes.HOME} />
    return <Component {...props} />
  }
