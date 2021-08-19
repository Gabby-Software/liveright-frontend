/* eslint-disable no-useless-escape */
import { useMemo } from 'react'
import { useLocation } from 'react-router'

import { authRoutes, routes } from '../config/routes.config'
const allRoutes = [...routes, ...authRoutes]
export const usePage = () => {
  const location = useLocation()
  return useMemo(() => {
    const path = location.pathname
    const route = allRoutes.find((r) => {
      return new RegExp(`^${r.url.replace(/:[^\/]+/g, '[^/]+')}$`).test(path)
    })
    return route
  }, [location])
}
