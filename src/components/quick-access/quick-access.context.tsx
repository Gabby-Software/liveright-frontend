import moment from 'moment'
import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useEffect,
  useState
} from 'react'

import logger from '../../managers/logger.manager'
import {
  getHealthDataAsync,
  logHealthDataAsync
} from '../../pages/progress/progress.api'
import { HealthData } from '../../pages/progress/progress.types'
import { AccountObjType } from '../../types/account.type'
import { quickAccessRoutes } from './quick-access.routes'

export type QuickAccessContextType = {
  open: boolean
  setOpen: Dispatch<boolean>
  route: quickAccessRoutes
  setRoute: Dispatch<quickAccessRoutes>
  logHealthData: (data: Partial<HealthData>) => Promise<void>
  todayHealthData: Partial<HealthData>
  client: AccountObjType | null
  setClient: Dispatch<null | AccountObjType>
}
const QuickAccessContext = createContext<QuickAccessContextType | null>(null)
export const useQuickAccess = () =>
  useContext(QuickAccessContext) as QuickAccessContextType

export const QuickAccessProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [route, setRoute] = useState<quickAccessRoutes>(quickAccessRoutes.LOG)
  const [client, setClient] = useState<null | AccountObjType>(null)
  const [todayHealthData, setTodayHealthData] = useState<Partial<HealthData>>(
    {}
  )
  const changeOpen = (open: boolean) => {
    setOpen(open)
    if (!open) setRoute(quickAccessRoutes.LOG)
  }
  useEffect(() => {
    getHealthDataAsync({ date: moment().format('YYYY-MM-DD') })
      .then((res) => res.data)
      .then((res) => {
        if (res.length) {
          setTodayHealthData(res[0])
        }
      })
  }, [])
  const logHealthData = (data: Partial<HealthData>) => {
    return logHealthDataAsync({
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
        setRoute,
        todayHealthData,
        logHealthData,
        client,
        setClient
      }}
    >
      {children}
    </QuickAccessContext.Provider>
  )
}
