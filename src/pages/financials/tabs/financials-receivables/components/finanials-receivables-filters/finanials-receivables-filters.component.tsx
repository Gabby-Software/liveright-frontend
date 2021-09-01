import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SearchIcon } from '../../../../../../assets/media/icons'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { useAuth } from '../../../../../../hooks/auth.hook'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { ACTION_GET_INVOICES_REQUEST } from '../../../../../../store/action-types'
import { RootState } from '../../../../../../store/reducers'
import FormSelectIssuer from '../../../../../invoices/components/form-select-issuer/form-select-issuer.component'
import { statuses } from '../../../../../invoices/invoices.data'
import Styles from './finanials-receivables-filters.styles'

type Props = {}
const FinanialsReceivablesFilters = ({}: Props) => {
  const { t } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type } = useAuth()
  const dispatch = useDispatch()
  const timer = useRef(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [invoice_to, setInvoice_to] = useState('')
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    current: { meta },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters
  } = useSelector((state: RootState) => state.invoices)
  const fetchInvoices = () => {
    clearTimeout(timer.current)
    setTimeout(() => {
      dispatch({
        type: ACTION_GET_INVOICES_REQUEST,
        payload: {
          include: 'invoiceTo',
          filters: { search, status, invoice_to },
          page: 1
        }
      })
    }, 400)
  }
  useEffect(fetchInvoices, [search, status, invoice_to])
  return (
    <Styles className="invoice-filters">
      <Input
        id="billing-search"
        prefix={<SearchIcon />}
        value={search}
        placeholder={t('search')}
        onChange={(e) => setSearch(e.target.value)}
        className="invoice-filters__search"
      />
      <Select
        id="billing-type"
        value={status}
        placeholder={t('invoices:status')}
        options={[{ label: 'All statuses', value: '' }, ...statuses]}
        onChange={setStatus}
        className="invoice-filters__status"
      />
      <FormSelectIssuer
        id="bulling-issuer"
        value={invoice_to}
        placeholder={t('invoices:issued-to')}
        onUpdate={setInvoice_to}
        className="invoice-filters__issuer"
      />
    </Styles>
  )
}

export default FinanialsReceivablesFilters
