import React from 'react'

import { Routes } from '../enums/routes.enum'
import { useToken } from '../hooks/token.hook'
import { identity } from '../pipes/identity.pipe'

export const onlyAuth =
  (Component: React.ComponentType<any>) => (props: any) => {
    const token = useToken()
    if (!token) {
      document.location.href = identity(Routes.LOGIN)
      return null
    }
    return <Component {...props} />
  }
