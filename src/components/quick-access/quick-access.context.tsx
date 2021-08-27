import React, { createContext, Dispatch, FC, useContext, useState } from 'react'

import { quickAccessRoutes } from './quick-access.routes'

export type QuickAccessContextType = {
  open: boolean
  setOpen: Dispatch<boolean>
  route: quickAccessRoutes
  setRoute: Dispatch<quickAccessRoutes>
}
const QuickAccessContext = createContext<QuickAccessContextType | null>(null)
export const useQuickAccess = () =>
  useContext(QuickAccessContext) as QuickAccessContextType

export const QuickAccessProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [route, setRoute] = useState<quickAccessRoutes>(quickAccessRoutes.LOG)
  const changeOpen = (open: boolean) => {
    setOpen(open)
    if (!open) setRoute(quickAccessRoutes.LOG)
  }
  return (
    <QuickAccessContext.Provider
      value={{ open, setOpen: changeOpen, route, setRoute }}
    >
      {children}
    </QuickAccessContext.Provider>
  )
}
