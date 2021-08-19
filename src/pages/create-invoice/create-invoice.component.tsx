import React from 'react'

import { useIsMobile } from '../../hooks/is-mobile.hook'
import CreateInvoiceDesktop from './create-invoice-desktop/create-invoice-desktop.component'
import CreateInvoiceMobile from './create-invoice-mobile/create-invoice-mobile.component'

type Props = {}

const CreateInvoice = ({}: Props) => {
  const isMobile = useIsMobile()
  return isMobile ? <CreateInvoiceMobile /> : <CreateInvoiceDesktop />
}

export default CreateInvoice
