import React, { useEffect, useState } from 'react'

import { SearchIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useInvoices } from '../../invoices.context'
import { statuses } from '../../invoices.data'
import FormSelectIssuer from '../form-select-issuer/form-select-issuer.component'
import Styles from './invoice-filters.styles'

const InvoiceFilters = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [invoice_from, setInvoice_from] = useState('')
  const { update } = useInvoices()

  const fetchInvoices = () => {
    update(1, { search, status, invoice_from })
  }

  useEffect(fetchInvoices, [search, status, invoice_from])

  return (
    <Styles className="invoice-filters">
      <Input
        formik
        id="invoice-search"
        prefix={<SearchIcon />}
        value={search}
        placeholder={t('search')}
        onChange={(e) => setSearch(e.target.value)}
        className="invoice-filters__search"
      />
      <Select
        id="invoice-status"
        value={status}
        placeholder={t('invoices:status')}
        options={[{ label: 'All statuses', value: '' }, ...statuses]}
        onChange={setStatus}
        className="invoice-filters__status"
      />
      {type === userTypes.CLIENT && (
        <FormSelectIssuer
          id="issuer"
          value={invoice_from}
          name={'invoice_from'}
          placeholder={t('invoices:issuer')}
          onUpdate={setInvoice_from}
          className="invoice-filters__issuer"
        />
      )}
    </Styles>
  )
}

export default InvoiceFilters
