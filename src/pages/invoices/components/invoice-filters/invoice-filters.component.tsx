import { useState } from 'react'

import { FilterIcon, SearchIcon } from '../../../../assets/media/icons'
import {
  ActiveFilterCard,
  ActiveFilters
} from '../../../../components/active-filters'
import BottomDrawer from '../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import IssuerSelect from '../../../../components/form/issuer-select/issuer-select.component'
import Select from '../../../../components/form/select/select.component'
import userTypes from '../../../../enums/user-types.enum'
import { InvoicesFilters } from '../../../../hooks/api/invoices/useInvoices'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { UseFilters } from '../../../../hooks/ui/useFilters'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { statuses } from '../../invoices.data'
import { DrawerContent, Styles } from './invoice-filters.styles'

interface InvoiceFiltersProps
  extends Pick<UseFilters<InvoicesFilters>, 'onFilter' | 'filters'> {}

export default function InvoiceFilters({
  onFilter,
  filters
}: InvoiceFiltersProps) {
  const { t } = useTranslation()
  const { type } = useAuth()
  const isMobile = useIsMobile()
  const [filtersDrawer, setFiltersDrawer] = useState(false)
  const [status, setStatus] = useState<OptionType | undefined>(undefined)
  const [issuer, setIssuer] = useState<OptionType | undefined>(undefined)

  const statusSelect = (
    <Select
      id="invoice-status"
      value={filters.status}
      placeholder={t('invoices:status')}
      options={[{ label: 'All statuses', value: '' }, ...statuses]}
      onChange={(e, option) => {
        onFilter('status', e)
        setStatus(option)
      }}
      className="invoice-filters__status"
    />
  )

  const issuerSelect = (
    <IssuerSelect
      id="issuer"
      value={filters.invoice_from}
      placeholder={t('invoices:issuer')}
      onChange={(e, option) => {
        onFilter('invoice_from', e)
        setIssuer(option)
      }}
      className="invoice-filters__issuer"
    />
  )

  return (
    <>
      <Styles className="invoice-filters">
        <Input
          id="invoice-search"
          prefix={<SearchIcon />}
          placeholder={t('search')}
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

      {isMobile && (status || issuer) && (
        <ActiveFilters>
          {status && (
            <ActiveFilterCard
              label="Status"
              value={status.label}
              onDelete={() => {
                setStatus(undefined)
                onFilter('status', undefined)
              }}
            />
          )}
          {issuer && (
            <ActiveFilterCard
              label="Issuer"
              value={issuer.label}
              onDelete={() => {
                setIssuer(undefined)
                onFilter('invoice_from', undefined)
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
