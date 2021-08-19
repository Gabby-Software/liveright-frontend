import React, { useEffect, useState } from 'react'

import * as serviceWorkerRegistration from '../../serviceWorkerRegistration'
import Styles from './update-popup.styles'

type Props = {}
const UpdatePopup = ({}: Props) => {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate })
  }, [])
  const refresh = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
    setShowReload(false)
    document.location.reload(true)
  }
  if (!showReload) return null
  return (
    <Styles>
      <div className={'update__title'}>New update is available</div>
      <div className={'update__desc'} onClick={refresh}>
        Click to refresh
      </div>
    </Styles>
  )
}

export default UpdatePopup
