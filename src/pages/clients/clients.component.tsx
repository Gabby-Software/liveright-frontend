import React from 'react'

import { onlyTrainer } from '../../guards/trainer.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ClientsDesktop from './clients-desktop/clients-desktop.component'
import ClientsMobile from './clients-mobile/clients-mobile.component'

const Clients = () => {
  const isMobile = useIsMobile()
  return isMobile ? <ClientsMobile /> : <ClientsDesktop />
}

export default onlyTrainer(Clients)
