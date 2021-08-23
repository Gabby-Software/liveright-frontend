export type QualityType = 'low' | 'average' | 'good' | 'high'

export type OverTimeType =
  | 'week'
  | 'month'
  | 'quarter'
  | 'ytd'
  | 'last_year'
  | 'specific_dates'

export type ProgressSectionsType = 'health_data' | 'measurements' | 'photos'

export type ProgressLogType = 'sleep' | 'heart_rate' | 'steps' | 'blood_glucose'

export interface GetHealthDataPayload {
  id?: string
  only_include?: ProgressLogType
  date?: string
  account_id?: number
  range?: OverTimeType
  from_date?: string
  to_date?: string
}

export interface HealthData {
  id?: string
  date?: string
  time?: string
  heart_rate?: {
    avg_rate: number
    quality: QualityType
    reported_by?: number
  }
  steps?: {
    daily_steps: number
    quality: QualityType
    reported_by?: number
  }
  blood_glucose?: {
    glucose: number
    quality: QualityType
    reported_by?: number
  }
  sleep?: {
    start_time?: string
    end_time?: string
    sleep_duration?: string
    nap_start_time?: string
    nap_end_time?: string
    nap_duration?: string
    quality?: QualityType
    reported_by?: number
  }
}
