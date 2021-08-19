import React, { useState } from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import BottomButton from '../../bottom-button/bottom-button.component'
import AddInvoiceModal from '../add-invoice-modal/add-invoice-modal.component'

const MobileInvoicesFooter = () => {
  const { t } = useTranslation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <BottomButton
        type={'primary'}
        className={'invoices-footer__add'}
        onClick={() => setIsFormOpen(true)}
      >
        {t('invoices:add')}
      </BottomButton>
      <AddInvoiceModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  )
}

export default MobileInvoicesFooter
