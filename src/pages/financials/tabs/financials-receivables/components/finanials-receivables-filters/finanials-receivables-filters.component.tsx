import debounce from 'lodash.debounce'

import { SearchIcon } from '../../../../../../assets/media/icons'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { InvoicesFilters } from '../../../../../../hooks/api/invoices/useInvoices'
import { UseFilters } from '../../../../../../hooks/ui/useFilters'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import FormSelectIssuer from '../../../../../invoices/components/form-select-issuer/form-select-issuer.component'
import { statuses } from '../../../../../invoices/invoices.data'
import Styles from './finanials-receivables-filters.styles'

export default function Filters({
  onFilter
}: Partial<UseFilters<InvoicesFilters>>) {
  const { t } = useTranslation()

  const handleSearch = debounce((e) => {
    onFilter?.('search', e.target.value)
  }, 400)

  return (
    <Styles className="invoice-filters">
      <Input
        formik
        id="billing-search"
        prefix={<SearchIcon />}
        defaultValue=""
        placeholder={t('search')}
        onChange={handleSearch}
        className="invoice-filters__search"
      />
      <Select
        id="billing-type"
        defaultValue=""
        placeholder={t('invoices:status')}
        options={[{ label: 'All statuses', value: '' }, ...statuses]}
        onChange={(e) => onFilter?.('status', e)}
        className="invoice-filters__status"
      />
      <FormSelectIssuer
        id="bulling-issuer"
        defaultValue=""
        placeholder={t('invoices:issued-to')}
        onUpdate={(e) => onFilter?.('invoice_to', e)}
        className="invoice-filters__issuer"
      />
    </Styles>
  )
}
