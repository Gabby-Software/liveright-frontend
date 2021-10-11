import React, { FC } from 'react'
import { useLocation } from 'react-router'

import { FlashIcon } from '../../assets/media/icons'
import { Routes } from '../../enums/routes.enum'
import QuickAccessPopup from './components/quick-access-popup/quick-access-popup.component'
import { QuickAccessProvider, useQuickAccess } from './quick-access.context'
import Styles, { Thumb } from './quick-access.styles'

const QuickAccessContent: FC = () => {
  const { open, setOpen } = useQuickAccess()
  const { pathname } = useLocation()
  const routesWhichFuckedUpAndNoNormalSolutionProvided = [Routes.CHAT]

  return (
    <Styles
      elevate={routesWhichFuckedUpAndNoNormalSolutionProvided.some((route) =>
        pathname.startsWith(route)
      )}
    >
      <QuickAccessPopup />
      <Thumb open={open} onClick={() => setOpen(!open)}>
        <FlashIcon />
      </Thumb>
    </Styles>
  )
}

const QuickAccess = () => (
  <QuickAccessProvider>
    <QuickAccessContent />
  </QuickAccessProvider>
)

export default QuickAccess
