export type QualityType = 'low' | 'average' | 'good' | 'high'

export type OverTimeType =
  | 'week'
  | 'month'
  | 'quarter'
  | 'ytd'
  | 'lastYear'
  | 'specificDates'

export type ProgressSectionsType = 'healthData' | 'measurements' | 'photos'

export type ProgressLogType = 'sleep' | 'heartRate' | 'steps' | 'glicose'

export interface HealthData {
  id: string
  date?: string
  time?: string
  heart_rate?: {
    avg_rate: number
    quality: QualityType
  }
  steps?: {
    daily_steps: number
    quality: QualityType
  }
  blood_glicose?: {
    glucose: number
    quality: QualityType
  }
  sleep?: {
    start_time: string
    end_time: string
    sleep_duration: string
    nap_start_time: string
    nap_end_time: string
    nap_duration: string
    quality: QualityType
  }
}
