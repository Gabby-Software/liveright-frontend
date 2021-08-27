import React, { FC } from 'react'

import { FlashIcon } from '../../assets/media/icons'
import QuickAccessPopup from './components/quick-access-popup/quick-access-popup.component'
import { QuickAccessProvider, useQuickAccess } from './quick-access.context'
import Styles, { Thumb } from './quick-access.styles'

const QuickAccessContent: FC = () => {
  const { open, setOpen } = useQuickAccess()
  return (
    <Styles>
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
