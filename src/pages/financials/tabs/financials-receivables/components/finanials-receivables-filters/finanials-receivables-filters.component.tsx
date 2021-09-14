import debounce from 'lodash.debounce'
import React, { useState } from 'react'

import { FilterIcon, SearchIcon } from '../../../../../../assets/media/icons'
import {
  ActiveFilterCard,
  ActiveFilters
} from '../../../../../../components/active-filters'
import BottomDrawer from '../../../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../../../components/form/input/input.component'
import IssuerSelect from '../../../../../../components/form/issuer-select/issuer-select.component'
import Select from '../../../../../../components/form/select/select.component'
import { InvoicesFilters } from '../../../../../../hooks/api/invoices/useInvoices'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import { UseFilters } from '../../../../../../hooks/ui/useFilters'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { statuses } from '../../../../../invoices/invoices.data'
import { DrawerContent, Styles } from './finanials-receivables-filters.styles'

export default function Filters({
  onFilter
}: Partial<UseFilters<InvoicesFilters>>) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [filtersDrawer, setFiltersDrawer] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<any>()
  const [selectedIssuer, setSelectedIssuer] = useState<any>()

  const handleSearch = debounce((e) => {
    onFilter?.('search', e.target.value)
  }, 400)

  const statusSelect = (
    <Select
      id="billing-type"
      value={selectedStatus}
      placeholder={t('invoices:status')}
      options={[{ label: 'All statuses', value: '' }, ...statuses]}
      onChange={(e, option) => {
        onFilter?.('status', e)
        setSelectedStatus(option)
      }}
      className="invoice-filters__status"
    />
  )

  const clientSelect = (
    <IssuerSelect
      id="bulling-issuer"
      placeholder={t('invoices:issued-to')}
      value={selectedIssuer ? selectedIssuer : undefined}
      onChange={(e, option) => {
        onFilter?.('invoice_to', e)
        setSelectedIssuer(option)
      }}
      className="invoice-filters__issuer"
    />
  )

  return (
    <>
      <Styles className="invoice-filters">
        <Input
          id="billing-search"
          prefix={<SearchIcon />}
          defaultValue=""
          placeholder={t('search')}
          onChange={handleSearch}
          className="invoice-filters__search"
        />
        {isMobile ? (
          <IconButton
            className="invoice-filters__filter-btn"
            onClick={() => setFiltersDrawer(true)}
          >
            <FilterIcon />
          </IconButton>
        ) : (
          <>
            {statusSelect}
            {clientSelect}
          </>
        )}
      </Styles>

      {isMobile && (selectedIssuer || selectedStatus) && (
        <ActiveFilters>
          {selectedStatus && (
            <ActiveFilterCard
              label="Status"
              value={selectedStatus.label}
              onDelete={() => {
                onFilter?.('status', '')
                setSelectedStatus(undefined)
              }}
            />
          )}
          {selectedIssuer && (
            <ActiveFilterCard
              label="Issuer"
              value={selectedIssuer.label}
              onDelete={() => {
                onFilter?.('invoice_to', '')
                setSelectedIssuer(undefined)
              }}
            />
          )}
        </ActiveFilters>
      )}

      {isMobile && (
        <BottomDrawer
          isOpen={filtersDrawer}
          onClose={() => setFiltersDrawer(false)}
          title={t('invoices:filter-title')}
        >
          <DrawerContent>
            {statusSelect}
            {clientSelect}

            <Button onClick={() => setFiltersDrawer(false)}>
              {t('apply-filters')}
            </Button>
          </DrawerContent>
        </BottomDrawer>
      )}
    </>
  )
}
