import React from 'react'

import { Routes } from '../enums/routes.enum'
import { useAuth } from '../hooks/auth.hook'
import { identity } from '../pipes/identity.pipe'

export const onlyActive =
  (Component: React.ComponentType<any>) => (props: any) => {
    const { email_verified_at } = useAuth()
    if (!email_verified_at) {
      document.location.href = identity(Routes.REGISTER_CONFIRMATION)
      return null
    }
    return <Component {...props} />
  }
