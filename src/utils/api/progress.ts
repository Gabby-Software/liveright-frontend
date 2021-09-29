import { Routes } from '../../enums/routes.enum'
import { getRoute } from '../routes'
import { isClient } from './auth'

interface GetViewRoutes {
  measurementsTo: string
  healthTo: string
  goalsTo: string
}

export function getViewRoutes(params: any, type: any): GetViewRoutes {
  const measurementsTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_MEASUREMENTS
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })
  const healthTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_HEALTH_DATA
    : getRoute(Routes.PROGRESS_HEALTH_DATA, { id: params.id })
  const goalsTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_GOALS
    : getRoute(Routes.PROGRESS_GOALS, { id: params.id })

  return {
    measurementsTo,
    healthTo,
    goalsTo
  }
}
