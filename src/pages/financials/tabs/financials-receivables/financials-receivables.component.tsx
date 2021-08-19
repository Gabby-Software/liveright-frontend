import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import FormButton from '../../../../components/forms/form-button/form-button.component'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import InvoicesAtention from '../../../invoices/components/invoices-atention/invoices-atention.component'
import { InvoicesProvider } from '../../../invoices/invoices.context'
import FinancialReceivablesList from './components/financial-receivables-list/financial-receivables-list.component'
import FinancialsReceivablesTable from './components/financials-receivables-table/financials-receivables-table.component'
import FinancialsReceivablesTotals from './components/financials-receivables-totals/financials-receivables-totals.component'
import FinanialsReceivablesFilters from './components/finanials-receivables-filters/finanials-receivables-filters.component'
import { receivablesTotals } from './financials-receivables.data'
import Styles from './financials-receivables.styles'

type Props = {}
const FinancialsReceivables = ({}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, uuid } = useAuth()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
  const [range, setRange] = useState(statisticRange.MONTH)
  return (
    <InvoicesProvider include={'invoiceTo'}>
      <Styles>
        <Link to={Routes.CREATE_INVOICE} className={'f-receivables__link'}>
          <FormButton type={'primary'}>{t('invoices:add')}</FormButton>
        </Link>
        <InvoicesAtention />
        <div className={'f-receivables__range'}>
          <FormSelectUI
            name={'range'}
            label={'Totals for...'}
            options={statisticRangeOptions}
            value={range}
            onUpdate={setRange}
          />
        </div>
        <FinancialsReceivablesTotals data={receivablesTotals[range]} />
        <PageSubtitle>All your Issued Invoices</PageSubtitle>
        <FinanialsReceivablesFilters />
        {isMobile ? (
          <FinancialReceivablesList />
        ) : (
          <FinancialsReceivablesTable />
        )}
      </Styles>
    </InvoicesProvider>
  )
}

export default FinancialsReceivables
