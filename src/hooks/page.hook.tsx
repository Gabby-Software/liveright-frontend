import { match } from 'path-to-regexp'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

import { authRoutes, routes } from '../config/routes.config'

const allRoutes = [...routes, ...authRoutes]
export const usePage = () => {
  const location = useLocation()
  return useMemo(() => {
    const path = location.pathname

    const route = allRoutes.find((r) => !!match(r.url)(path))
    return route
  }, [location])
}
