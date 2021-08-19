import {OverTimeType, ProgressLogType, ProgressSectionsType} from "./progress.types";

export const PROGRESS_SECTIONS: {[key: string]: ProgressSectionsType} = {
  LOG: 'log',
  HEALTH_DATA: 'healthData',
  MEASUREMENTS: 'measurements',
  PHOTOS: 'photos'
};

export const OVER_TIME: {[key: string]: OverTimeType} = {
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YTD: 'ytd',
  LAST_YEAR: 'lastYear',
  SPECIFIC: 'specificDates',
};

export const PROGRESS_LOG: {[key: string]: ProgressLogType} = {
  SLEEP: 'sleep',
  STEPS: 'steps',
  HEART_RATE: 'heartRate',
  GLICOSE: 'glicose',
};

export const TEMP_DATA: {
  [key: string]: {
    date: string;
    value: number | {
      from: string;
      to: string;
    }
  }
} = {
  sleep: {
    date: "2021-04-12",
    value: {
      from: '21:00',
      to: '7:00',
    }
  },
  heart: {
    date: "2021-04-12",
    value: 80
  },
  steps: {
    date: "2021-04-12",
    value: 1000
  },
  blood: {
    date: "2021-04-12",
    value: 20
  },
}
