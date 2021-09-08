import { Routes } from '../../enums/routes.enum'
import {
  OverTimeType,
  ProgressLogType,
  ProgressSectionsType,
  QualityType
} from './progress.types'

export const PROGRESS_SECTIONS: {
  [Option in Uppercase<ProgressSectionsType>]: ProgressSectionsType
} = {
  HEALTH_DATA: 'health_data',
  MEASUREMENTS: 'measurements',
  PHOTOS: 'photos'
}

export const PROGRESS_LOG_URL: { [key: string]: string } = {
  health_data: Routes.PROGRESS_LOG_HEALTH_DATA,
  measurements: Routes.PROGRESS_LOG_MEASUREMENTS,
  photos: Routes.PROGRESS_LOG_PHOTOS
}

export const OVER_TIME: { [key: string]: OverTimeType } = {
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YTD: 'ytd',
  LAST_YEAR: 'last_year',
  SPECIFIC: 'specific_dates'
}

export const QUALITY: { [key: string]: QualityType } = {
  LOW: 'low',
  AVERAGE: 'average',
  GOOD: 'good',
  HIGH: 'high'
}

export const PROGRESS_LOG: { [key: string]: ProgressLogType } = {
  SLEEP: 'sleep',
  STEPS: 'steps',
  HEART_RATE: 'heart_rate',
  GLICOSE: 'blood_glucose'
}

export const PROGRESS_TABLE_KEYS: { [key: string]: string[] } = {
  sleep: [
    'start_time',
    'end_time',
    'nap_start_time',
    'nap_end_time',
    'total_sleep'
  ],
  heart_rate: ['avg_rate'],
  steps: ['daily_steps'],
  blood_glucose: ['glucose']
}
