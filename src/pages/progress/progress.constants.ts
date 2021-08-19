import { Routes } from '../../enums/routes.enum'
import {
  OverTimeType,
  ProgressLogType,
  ProgressSectionsType
} from './progress.types'

export const PROGRESS_SECTIONS: { [key: string]: ProgressSectionsType } = {
  HEALTH_DATA: 'healthData',
  MEASUREMENTS: 'measurements',
  PHOTOS: 'photos'
}

export const PROGRESS_LOG_URL: { [key: string]: string } = {
  healthData: Routes.PROGRESS_LOG_HEALTH_DATA,
  measurements: Routes.PROGRESS_LOG_MEASUREMENTS,
  photos: Routes.PROGRESS_LOG_PHOTOS
}

export const OVER_TIME: { [key: string]: OverTimeType } = {
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YTD: 'ytd',
  LAST_YEAR: 'lastYear',
  SPECIFIC: 'specificDates'
}

export const PROGRESS_LOG: { [key: string]: ProgressLogType } = {
  SLEEP: 'sleep',
  STEPS: 'steps',
  HEART_RATE: 'heartRate',
  GLICOSE: 'glicose'
}
