import React from 'react'

import Accordion from '../../../../components/accordion/accordion.component'
import { useAPIData } from '../../../../hoc/api-get'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { addressLine } from '../../../../pipes/address-line.pipe'
import { InvoiceFullType } from '../../../../types/invoice.type'
import Styles from './invoice-mobile-details.styles'

type Props = {}
const InvoiceMobileDetails = ({}: Props) => {
  const { t } = useTranslation()
  const { data } = useAPIData<InvoiceFullType>()
  const Item = ({
    open,
    switchOpen,
    children
  }: {
    open?: boolean
    switchOpen?: () => void
    children: React.ReactNode
  }) => (
    <Accordion.Item
      open={open}
      switchOpen={switchOpen}
      title={open ? 'Hide Invoice Details' : 'See Invoice Details'}
    >
      {children}
    </Accordion.Item>
  )
  return (
    <Styles>
      <Accordion>
        <Item>
          <div className={'invoice-att'}>
            <div className={'invoice-att__title'}>
              {t('invoices:issued-by')}
            </div>
            <div className={'invoice-att__name'}>
              {data.invoice_from.user.first_name}{' '}
              {data.invoice_from.user.last_name}
            </div>
            <div className={'invoice-att__desc'}>
              {addressLine(data.invoice_from.address)}
            </div>
          </div>
          <div className={'invoice-att'}>
            <div className={'invoice-att__title'}>
              {t('invoices:issued-to')}
            </div>
            <div className={'invoice-att__name'}>
              {data.invoice_to.user.first_name} {data.invoice_to.user.last_name}
            </div>
            <div className={'invoice-att__desc'}>
              {addressLine(data.invoice_to.address)}
            </div>
          </div>
        </Item>
      </Accordion>
    </Styles>
  )
}

export default InvoiceMobileDetails
