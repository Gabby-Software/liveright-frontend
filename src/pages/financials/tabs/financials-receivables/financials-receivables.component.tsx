import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useGoals from '../../../../hooks/api/goals/useGoals'
import useInvoices from '../../../../hooks/api/invoices/useInvoices'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import InvoicesAtention from '../../../invoices/components/invoices-atention/invoices-atention.component'
import FinancialReceivablesList from './components/financial-receivables-list/financial-receivables-list.component'
import FinancialsReceivablesTable from './components/financials-receivables-table/financials-receivables-table.component'
import FinancialsReceivablesTotals from './components/financials-receivables-totals/financials-receivables-totals.component'
import FinanialsReceivablesFilters from './components/finanials-receivables-filters/finanials-receivables-filters.component'
import Styles from './financials-receivables.styles'

type Props = {}

const RANGE_FACTORS = {
  week: 0.25,
  month: 1,
  year: 12
}

const FinancialsReceivables = ({}: Props) => {
  const isMobile = useIsMobile()
  const auth = useAuth()
  const { t } = useTranslation()
  const { progressCount, statistic, range, onRange } = useStatistic()
  const { getTargetMonthlyIncome } = useGoals()
  const { invoices, meta, ...actions } = useInvoices({
    initialFilters: {
      invoice_from: auth.id
    }
  })

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
            defaultValue={statisticRange.WEEK}
            onChange={onRange}
          />
        </div>
      </div>

      <FinancialsReceivablesTotals
        target={
          getTargetMonthlyIncome(['pt_session', 'coaching', 'consultation']) *
          (RANGE_FACTORS as any)[range]
        }
        countData={progressCount}
        data={statistic}
      />

      <div className="f-receivables__subtitle-container">
        <h2 className="f-receivables__subtitle">
          {t('invoices:billing-history')}
        </h2>
      </div>

      {isMobile ? (
        <>
          <FinanialsReceivablesFilters onFilter={actions.onFilter} />
          <FinancialReceivablesList
            data={invoices}
            meta={meta}
            actions={actions}
          />
        </>
      ) : (
        <>
          <Card className="f-receivables__table-card">
            <FinanialsReceivablesFilters onFilter={actions.onFilter} />
            <FinancialsReceivablesTable
              data={invoices}
              meta={meta}
              actions={actions}
            />
          </Card>
        </>
      )}
    </Styles>
  )
}

export default FinancialsReceivables
