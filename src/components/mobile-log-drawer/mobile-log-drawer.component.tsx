import React from 'react'

import BottomDrawer from '../bottom-drawer/bottom-drawer.component'
import QuickAccessPopup from '../quick-access/components/quick-access-popup/quick-access-popup.component'

type MobileLogDrawerPropsType = {
  isOpen: boolean
  onClose: () => void
}
const MobileLogDrawer = ({ isOpen, onClose }: MobileLogDrawerPropsType) => {
  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose}>
      <QuickAccessPopup />
    </BottomDrawer>
  )
}

export default MobileLogDrawer
