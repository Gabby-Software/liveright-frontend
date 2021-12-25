import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { ProfileIcon } from '../../../../assets/media/icons'
import BottomDrawer from '../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../components/buttons/button/button.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { Content } from './switch-client.styles'

interface SwitchClientProps {
  route: string
  open: boolean
  onClose: () => void
}

export default function SwitchClient({
  route,
  open,
  onClose
}: SwitchClientProps) {
  const { t } = useTranslation()
  const [id, setId] = useState('')
  const history = useHistory()
  const { path } = useRouteMatch()
  const isMobile = useIsMobile()

  const handleClick = () => {
    const url = route.includes(':clientId')
      ? getRoute(route, { clientId: id })
      : `${path}?clientId=${id}`
    history.push(url)
    onClose()
  }

  const content = (
    <Content>
      <ClientSelect
        placeholder={t('sessions:select-client')}
        prefix={<ProfileIcon />}
        value={id}
        onChange={(e) => setId(e)}
        className="switch-client__select"
        menuPosition="fixed"
        includeAll={false}
      />

      <Button disabled={!id} onClick={handleClick}>
        {t('done')}
      </Button>
    </Content>
  )

  if (isMobile) {
    return (
      <BottomDrawer isOpen={open} onClose={onClose} title="Switch Client">
        {content}
      </BottomDrawer>
    )
  }

  return (
    <Dialog title="Switch Client" onClose={onClose} open={open}>
      {content}
    </Dialog>
  )
}
