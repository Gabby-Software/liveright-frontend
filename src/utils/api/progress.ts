import { Routes } from '../../enums/routes.enum'
import { uploadFile } from '../../services/api/files'
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
    : getRoute(Routes.PROGRESS_MEASUREMENTS, { clientId: params.clientId })
  const healthTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_HEALTH_DATA
    : getRoute(Routes.PROGRESS_HEALTH_DATA, { clientId: params.clientId })
  const goalsTo = isClient(type)
    ? Routes.PROGRESS_CLIENT_GOALS
    : getRoute(Routes.PROGRESS_GOALS, { clientId: params.clientId })

  return {
    measurementsTo,
    healthTo,
    goalsTo
  }
}

export async function formatMeasurementsValues(
  values: any,
  accountId?: string
): Promise<any> {
  const copy = { ...values }
  const images: any = omitEmpty(copy.images)

  if (images.front || images.side || images.back) {
    for (const key of Object.keys(images)) {
      // Remove images from body if empty or already uploaded (starts with https://), keep null to remove
      if (
        !images[key] ||
        (typeof images[key] === 'string' && images[key].includes('https://'))
      ) {
        delete images[key]
      }

      // Upload image and attach if a file
      if (images[key] && typeof images[key] !== 'string') {
        const path = await uploadFile(images[key])
        images[key] = path
      }
    }
  }

  const body: any = {}

  if (accountId) {
    body['account_id'] = Number(accountId)
  }

  body['type'] = copy['type']
  body['source'] = 'manual'
  body['date'] = copy['date']
  body['weight_kgs'] = convertNumber(copy['weight_kgs'])
  body['weight_lbs'] = convertNumber(copy['weight_lbs'])
  body['body_fat'] = convertNumber(copy['body_fat'])
  body['fat_mass'] = convertNumber(copy['fat_mass'])
  body['lean_mass'] = convertNumber(copy['lean_mass'])
  body['notes'] = copy['notes']

  if (copy['measurements']) {
    body['measurements'] = omitEmpty(copy['measurements'])

    Object.keys(body['measurements']).forEach((key) => {
      body['measurements'][key] = convertNumber(body['measurements'][key])
    })
  }

  if (Object.keys(images).length) {
    body['images'] = images
  }

  return body
}

function convertNumber(value: any) {
  return Number(value)
}

export function formatNumberValues(values: any) {
  values['weight_kgs'] = convertNumber(values['weight_kgs'])
  values['weight_lbs'] = convertNumber(values['weight_lbs'])
  values['body_fat'] = convertNumber(values['body_fat'])
  values['fat_mass'] = convertNumber(values['fat_mass'])
  values['lean_mass'] = convertNumber(values['lean_mass'])

  Object.keys(values['measurements']).forEach((key) => {
    values['measurements'][key] = convertNumber(values['measurements'][key])
  })

  return values
}

export function dataToFormValues(data: any) {
  const formValues: any = {}

  formValues['body_fat'] = data['body_fat']
  formValues['date'] = data['date']
  formValues['fat_mass'] = data['fat_mass']
  formValues['lean_mass'] = data['lean_mass']
  formValues['measurements'] = data['measurements']
  formValues['notes'] = data['notes']
  formValues['weight_kgs'] = data['weight_kgs']
  formValues['weight_lbs'] = data['weight_lbs']

  formValues['images'] = omitEmpty(data['images'])

  return omitEmpty(formValues)
}

export function getBodyFat(values: any): number {
  if (!values.weight_lbs) {
    return 0
  }

  const measurementsToSM = getTotal(values, 'skin_fold') / 100

  const val = (27 * measurementsToSM) / (Number(values.weight_lbs) || 1)

  return Number(val.toFixed(2))
}

export function getFatMass(values: any): number {
  if (!values.weight_kgs) {
    return 0
  }

  const val = Number(values.weight_kgs) * (Number(values.body_fat) / 100)
  return Number(val.toFixed(2))
}

export function getLeanMass(values: any): number {
  const val = (Number(values.weight_kgs) || 0) - (Number(values.fat_mass) || 0)
  return Number(val.toFixed(2))
}

export function getTotal(values: any, type: string): number {
  const measurements = values.measurements

  const fields: string[] =
    type === 'skin_fold'
      ? [
          'chin',
          'cheek',
          'pec',
          'biceps',
          'midaxillary',
          'suprailiac',
          'abdominal',
          'triceps',
          'subscapular',
          'lower_back',
          'knee',
          'calf',
          'quad',
          'hamstring'
        ]
      : [
          'neck',
          'chest',
          'shoulders',
          'upper_arm',
          'waist',
          'hips',
          'upper_thighs'
        ]

  const val = fields.reduce(
    (acc, cur) => acc + (measurements?.[cur] ? Number(measurements[cur]) : 0),
    0
  )

  return Number(val.toFixed(2))
}

export function formatGoalsValues(values: any, accountId?: null) {
  const data: any = {}

  if (accountId) {
    data['account_id'] = Number(accountId)
  }

  data['targets'] = []

  data.targets.push({
    from: values['from'],
    to: values['to'],
    goal: values['body_weight'],
    type: 'body_weight',
    value_type: 'number'
  })

  data.targets.push({
    from: values['from'],
    to: values['to'],
    goal: values['lean_mass'],
    type: 'lean_mass',
    value_type: 'number'
  })

  data.targets.push({
    from: values['from'],
    to: values['to'],
    goal: values['body_fat'],
    type: 'body_fat',
    value_type: 'number'
  })

  return data
}
