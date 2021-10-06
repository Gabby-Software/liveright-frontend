import { Skeleton } from 'antd'
import React, { lazy, useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'

import Button from '../../components/buttons/button/button.component'
// import PaymentBadge from '../../components/payment-badge/payment-badge.component'
import RoutedTabs from '../../components/routed-tabs/routed-tabs.component'
import { toast } from '../../components/toast/toast.component'
import { Routes } from '../../enums/routes.enum'
import { onlyTrainer } from '../../guards/trainer.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { parseQuery } from '../../utils/query'
import { financialTabs } from './financials.data'
import Styles from './financials.styles'

const FinancialsPayables = lazy(
  () => import('./tabs/financials-payables/financials-payables.component')
)
const FinancialsOverview = lazy(
  () => import('./tabs/financials-overview/financials-overview.component')
)
const FinancialsReceivables = lazy(
  () => import('./tabs/financials-receivables/financials-receivables.component')
)
const FinancialsGoals = lazy(
  () => import('./tabs/financials-goals/financials-goals.component')
)

const FinancialGetPaid = lazy(
  () => import('./tabs/financials-getPaid/financials-getPaid.component')
)

type Props = {}

const Financials = ({}: Props) => {
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const isMobile = useIsMobile()
  const query = parseQuery(location.search)

  useEffect(() => {
    // ?sr=1 is returned from stripe if link expired or any error
    if (query.sr) {
      toast.show({
        type: 'error',
        msg: 'Stripe link is expired, please try again.'
      })
      history.replace(location.pathname)
    }
  }, [query.sr])

  const content = (
    <Styles>
      {!isMobile && (
        <div className="financials__title-container">
          <h1 className="financials__title">{t('invoices:title')}</h1>

          {location.pathname.includes(Routes.FINANCIALS_RECEIVABLES) && (
            <Button to={Routes.CREATE_INVOICE}>{t('invoices:add')}</Button>
          )}
          {location.pathname.includes(Routes.PAYMENT_METHODS) && (
            <Button variant="secondary" to={Routes.CREATE_INVOICE}>
              {t('invoices:manage-payment-methods')}
            </Button>
          )}
          {location.pathname.includes(Routes.FINANCIALS_GOALS) && (
            <Button variant="secondary" size="md" to={Routes.EDIT_GOALS}>
              {t('financials:overview.edit-goal')}
            </Button>
          )}
          {location.pathname.includes(Routes.FINANCIALS_GET_PAID) && (
            <Button to={Routes.CREATE_INVOICE}>{t('invoices:add')}</Button>
          )}
        </div>
      )}

      <div className="financials__tabs-container">
        <RoutedTabs tabs={financialTabs} className="financials__tabs" />
        {/* {!isMobile && <PaymentBadge />} */}
      </div>

      <React.Suspense fallback={Skeleton}>
        <Route
          path={Routes.FINANCIALS_OVERVIEW}
          component={FinancialsOverview}
        />
        <Route
          path={Routes.FINANCIALS_RECEIVABLES}
          component={FinancialsReceivables}
        />
        <Route
          path={Routes.FINANCIALS_PAYABLES}
          component={FinancialsPayables}
        />
        <Route path={Routes.FINANCIALS_GOALS} component={FinancialsGoals} />
        <Route path={Routes.FINANCIALS_GET_PAID} component={FinancialGetPaid} />
      </React.Suspense>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title={t('menu.financials')}
      headerNavChat
      actionComponent={
        location.pathname.includes(Routes.FINANCIALS_GOALS) ? (
          <Button variant="secondary" size="md" to={Routes.EDIT_GOALS}>
            {t('financials:overview.edit-goal')}
          </Button>
        ) : (
          <Button to={Routes.CREATE_INVOICE}>
            {t('invoices:new-invoice')}
          </Button>
        )
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default onlyTrainer(Financials)
