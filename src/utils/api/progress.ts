import { Routes } from '../../enums/routes.enum'
import { omitEmpty } from '../obj'
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

export function formatMeasurementsValues(values: any): any {
  const body: any = {}

  body['type'] = values['type']
  body['source'] = values['manual']
  body['date'] = values['date']
  body['weight_kgs'] = values['weight_kgs']
  body['weight_lbs'] = values['weight_lbs']

  if (['skin_fold', 'circumference'].includes(values['type'])) {
    body['measurements'] = omitEmpty(values['measurements'])
  }

  return body
}
