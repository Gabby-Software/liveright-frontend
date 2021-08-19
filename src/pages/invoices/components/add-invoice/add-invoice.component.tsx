import React from 'react'

import Modal from '../../../../components/modal/modal.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'

type Props = {
  isOpen: boolean
  onClose: () => void
}
const AddInvoice = ({ isOpen, onClose }: Props) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  if (isMobile) return null
  return (
    <Modal visible={isOpen} onCancel={onClose} large>
      <Modal.Title>{t('sessions:add')}</Modal.Title>
    </Modal>
  )
}

export default AddInvoice
