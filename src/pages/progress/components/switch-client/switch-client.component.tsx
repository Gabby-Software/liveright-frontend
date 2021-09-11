import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { ProfileIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getRoute } from '../../../../utils/routes'
import { Content } from './switch-client.styles'

interface SwitchClientProps {
  open: boolean
  onClose: () => void
}

export default function SwitchClient({ open, onClose }: SwitchClientProps) {
  const { t } = useTranslation()
  const [id, setId] = useState('')
  const history = useHistory()

  const handleClick = () => {
    history.push(getRoute(Routes.PROGRESS_HEALTH_DATA, { id }))
    onClose()
  }

  return (
    <Dialog title="Switch Client" onClose={onClose} open={open}>
      <Content>
        <ClientSelect
          placeholder={t('sessions:select-client')}
          prefix={<ProfileIcon />}
          onChange={(e) => setId(e)}
          className="switch-client__select"
          menuPosition="fixed"
        />

        <Button disabled={!id} onClick={handleClick}>
          {t('done')}
        </Button>
      </Content>
    </Dialog>
  )
}
