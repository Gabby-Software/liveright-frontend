import moment from 'moment'
import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState
} from 'react'

import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import logger from '../../managers/logger.manager'
import {
  getHealthDataAsync,
  logHealthDataAsync
} from '../../pages/progress/progress.api'
import {
  GetHealthDataPayload,
  HealthData
} from '../../pages/progress/progress.types'
import { AccountObjType } from '../../types/account.type'
import { quickAccessRoutes } from './quick-access.routes'

export type QuickAccessContextType = {
  open: boolean
  setOpen: Dispatch<boolean>
  route: quickAccessRoutes
  routeParams: { [key: string]: string }
  setRoute: (
    route: quickAccessRoutes,
    params?: { [key: string]: string }
  ) => void
  logHealthData: (data: Partial<HealthData>) => Promise<void>
  todayHealthData: Partial<HealthData>
  client: AccountObjType | null
  setClient: Dispatch<null | AccountObjType>
  workoutsData: any[]
  mealsData: any[]
}

// Dummy data
const workoutsData = [
  {
    id: 1,
    type: 'strength',
    iconColor: '#E49A0A',
    name: 'The Great Workout',
    exercises: [
      {
        id: 1,
        name: 'Pushups',
        type: 'strength',
        sets: 4,
        reps: 4,
        rest: '10:00',
        tempo: '3005'
      },
      {
        id: 2,
        name: 'Superset A',
        type: 'superset',
        exercises: [
          {
            id: 21,
            name: 'Pushups',
            type: 'strength',
            sets: 4,
            reps: 4,
            rest: '10:00',
            tempo: '3005'
          },
          {
            id: 22,
            name: 'Pushups',
            type: 'strength',
            sets: 4,
            reps: 4,
            rest: '10:00',
            tempo: '3005'
          }
        ]
      },
      {
        id: 3,
        name: 'Cardio Bike',
        type: 'cardio',
        intensity: 'High',
        time: '00:10:00'
      }
    ],
    completed: true
  },
  {
    id: 2,
    type: 'strength',
    iconColor: '#E49A0A',
    name: 'Second Day Workout',
    exercises: [
      {
        id: 1,
        name: 'Pushups',
        type: 'strength',
        sets: 4,
        reps: 4,
        rest: '10:00',
        tempo: '3005'
      },
      {
        id: 2,
        name: 'Superset A',
        type: 'superset',
        exercises: [
          {
            id: 21,
            name: 'Pushups',
            type: 'strength',
            sets: 4,
            reps: 4,
            rest: '10:00',
            tempo: '3005'
          },
          {
            id: 22,
            name: 'Pushups',
            type: 'strength',
            sets: 4,
            reps: 4,
            rest: '10:00',
            tempo: '3005'
          }
        ]
      },
      {
        id: 3,
        name: 'Cardio Bike',
        type: 'cardio',
        intensity: 'High',
        time: '00:10:00'
      }
    ],
    completed: false
  },
  {
    id: 3,
    type: 'cardio',
    iconColor: '#EF1733',
    name: 'Cardio Bike',
    exercises: [
      {
        id: 3,
        name: 'Cardio Bike',
        type: 'cardio',
        intensity: 'High',
        time: '00:10:00'
      }
    ],
    time: '10 min',
    completed: false
  }
]

const mealsData: any[] = []

const QuickAccessContext = createContext<QuickAccessContextType | null>(null)
export const useQuickAccess = () =>
  useContext(QuickAccessContext) as QuickAccessContextType

export const QuickAccessProvider: FC<{ initialOpen?: boolean }> = ({
  children,
  initialOpen
}) => {
  const [open, setOpen] = useState(!!initialOpen)
  const [route, _setRoute] = useState<quickAccessRoutes>(quickAccessRoutes.LOG)
  const [routeParams, setRouteParams] = useState<{ [key: string]: string }>({})
  const [client, setClient] = useState<null | AccountObjType>(null)
  const { type } = useAuth()
  const [todayHealthData, setTodayHealthData] = useState<Partial<HealthData>>(
    {}
  )

  const setRoute = (
    route: quickAccessRoutes,
    params?: { [key: string]: string }
  ) => {
    _setRoute(route)
    params && setRouteParams(params)
  }

  const changeOpen = (open: boolean) => {
    setOpen(open)
    if (!open) setRoute(quickAccessRoutes.LOG)
  }

  useEffect(() => {
    const payload: Partial<GetHealthDataPayload> = {
      date: moment().format('YYYY-MM-DD')
    }
    if (type === userTypes.TRAINER) {
      payload.account_id = client?.accounts?.find(
        (acc) => acc.type === 'client'
      )?.id
    }
    getHealthDataAsync(payload)
      .then((res) => res?.data)
      .then((res) => {
        if (res?.length) {
          setTodayHealthData(res[0])
        }
      })
  }, [type, client])

  const logHealthData = (data: Partial<HealthData>) => {
    return logHealthDataAsync({
      id: todayHealthData?.id,
      account_id: client?.accounts?.find((acc) => acc.type === 'client')?.id,
      ...data,
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('HH:mm:ss')
    }).then((res) => {
      logger.success('health data updated', res)
      setTodayHealthData({ ...todayHealthData, ...data })
    })
  }

  return (
    <QuickAccessContext.Provider
      value={{
        open,
        setOpen: changeOpen,
        route,
        routeParams,
        setRoute,
        todayHealthData,
        logHealthData,
        client,
        setClient,
        workoutsData,
        mealsData
      }}
    >
      {children}
    </QuickAccessContext.Provider>
  )
}
