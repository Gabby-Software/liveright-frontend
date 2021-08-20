import { QualityType } from '../../progress/progress.types'

export const getHeartRateQuality = (value: number): QualityType => {
  if (value < 60) {
    return 'low'
  } else if (value < 70) {
    return 'average'
  } else if (value < 100) {
    return 'good'
  } else {
    return 'high'
  }
}

export const getStepsQuality = (value: number): QualityType => {
  if (value < 1000) {
    return 'low'
  } else if (value < 3500) {
    return 'average'
  } else {
    return 'good'
  }
}

export const getGlucoseQuality = (value: number): QualityType => {
  if (value < 200) {
    return 'good'
  } else {
    return 'high'
  }
}
