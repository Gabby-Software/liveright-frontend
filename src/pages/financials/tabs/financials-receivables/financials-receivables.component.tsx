import { useState } from 'react'

import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useInvoices from '../../../../hooks/api/invoices/useInvoices'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import InvoicesAtention from '../../../invoices/components/invoices-atention/invoices-atention.component'
import FinancialReceivablesList from './components/financial-receivables-list/financial-receivables-list.component'
import FinancialsReceivablesTable from './components/financials-receivables-table/financials-receivables-table.component'
import FinancialsReceivablesTotals from './components/financials-receivables-totals/financials-receivables-totals.component'
import FinanialsReceivablesFilters from './components/finanials-receivables-filters/finanials-receivables-filters.component'
import { receivablesTotals } from './financials-receivables.data'
import Styles from './financials-receivables.styles'

type Props = {}

const FinancialsReceivables = ({}: Props) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [range, setRange] = useState(statisticRange.MONTH)

  const { invoices, meta, ...actions } = useInvoices()

  return (
    <Styles>
      <div className="f-receivables__subtitle-container">
        <h2 className="f-receivables__subtitle">
          {t('invoices:need-attention')}
        </h2>
      </div>

      <InvoicesAtention />

      <div className="f-receivables__subtitle-container">
        <h2 className="f-receivables__subtitle">
          {t('invoices:your-progress')}
        </h2>

        <div className="f-receivables__range-select">
          <Select
            id="progress-range"
            options={statisticRangeOptions}
            value={range}
            onChange={setRange}
          />
        </div>
      </div>

      <FinancialsReceivablesTotals data={receivablesTotals[range]} />

      <div className="f-receivables__subtitle-container">
        <h2 className="f-receivables__subtitle">
          {t('invoices:billing-history')}
        </h2>
      </div>

      <Card className="f-receivables__table-card">
        <FinanialsReceivablesFilters onFilter={actions.onFilter} />
        {isMobile ? (
          <FinancialReceivablesList />
        ) : (
          <FinancialsReceivablesTable
            data={invoices}
            meta={meta}
            actions={actions}
          />
        )}
      </Card>
    </Styles>
  )
}

export default FinancialsReceivables
