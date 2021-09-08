import React, { useEffect, useState } from 'react'

import { FilterIcon, SearchIcon } from '../../../../assets/media/icons'
import BottomDrawer from '../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useInvoices } from '../../invoices.context'
import { statuses } from '../../invoices.data'
import FormSelectIssuer from '../form-select-issuer/form-select-issuer.component'
import { DrawerContent, Styles } from './invoice-filters.styles'

const InvoiceFilters = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [invoice_from, setInvoice_from] = useState('')
  const { update } = useInvoices()
  const isMobile = useIsMobile()
  const [filtersDrawer, setFiltersDrawer] = useState(false)

  const fetchInvoices = () => {
    update(1, { search, status, invoice_from })
  }

  useEffect(fetchInvoices, [search, status, invoice_from])

  const statusSelect = (
    <Select
      id="invoice-status"
      value={status}
      placeholder={t('invoices:status')}
      options={[{ label: 'All statuses', value: '' }, ...statuses]}
      onChange={setStatus}
      className="invoice-filters__status"
    />
  )

  const issuerSelect = (
    <FormSelectIssuer
      id="issuer"
      value={invoice_from}
      name={'invoice_from'}
      placeholder={t('invoices:issuer')}
      onUpdate={setInvoice_from}
      className="invoice-filters__issuer"
    />
  )

  return (
    <>
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
        {isMobile ? (
          <>
            <IconButton
              className="invoice-filters__search-btn"
              onClick={() => setFiltersDrawer(true)}
            >
              <FilterIcon />
            </IconButton>
          </>
        ) : (
          <>
            {statusSelect}
            {type === userTypes.CLIENT && issuerSelect}
          </>
        )}
      </Styles>

      {isMobile && (
        <BottomDrawer
          isOpen={filtersDrawer}
          onClose={() => setFiltersDrawer(false)}
          title={t('invoices:filter-title')}
        >
          <DrawerContent>
            {statusSelect}
            {type === userTypes.CLIENT && issuerSelect}

            <Button onClick={() => setFiltersDrawer(false)}>
              {t('apply-filters')}
            </Button>
          </DrawerContent>
        </BottomDrawer>
      )}
    </>
  )
}

export default InvoiceFilters
