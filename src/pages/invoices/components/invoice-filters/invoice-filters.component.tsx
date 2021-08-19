import React, { useEffect, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { FormInputLabeledUI } from '../../../../components/forms/form-input-labeled/form-input-labeled.component'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
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
    <Styles className={'invoice-filters'}>
      <FormInputLabeledUI
        icon={<SearchIcon />}
        iconPrepend
        value={search}
        name={'search'}
        label={t('search')}
        onUpdate={setSearch}
      />
      <FormSelectUI
        value={status}
        name={'status'}
        label={t('invoices:status')}
        options={[{ label: 'All statuses', value: '' }, ...statuses]}
        onUpdate={setStatus}
      />
      {type === userTypes.CLIENT ? (
        <FormSelectIssuer
          value={invoice_from}
          name={'invoice_from'}
          label={t('invoices:issuer')}
          onUpdate={setInvoice_from}
        />
      ) : (
        <div />
      )}
      <div />
    </Styles>
  )
}

export default InvoiceFilters
