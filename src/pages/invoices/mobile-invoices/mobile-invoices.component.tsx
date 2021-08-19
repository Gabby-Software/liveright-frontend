import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Card from '../../../components/card/card.style'
import MobileFilterDrawer from '../../../components/invoices/mobile-filter-drawer/mobile-filter-drawer.component'
import MobileInvoicesFooter from '../../../components/invoices/mobile-invoices-footer/mobile-invoices-footer.component'
import Overall from '../../../components/overall-card/overall-card.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useInfiniteScroll } from '../../../hooks/infinite-scroll.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { classes } from '../../../pipes/classes.pipe'
import { ACTION_GET_INVOICES_REQUEST } from '../../../store/action-types'
import { RootState } from '../../../store/reducers'
import { TrainerInvoiceType } from '../../../types/invoice.type'
import { OptionType } from '../../../types/option.type'
import { invoices } from '../invoices.data'
import Styles from './mobile-invoices.styles'

type Props = {}
const MobileInvoices = ({}: Props) => {
  const [page, setPage] = useState(1)
  const { type } = useAuth()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    filters,
    current: { meta }
  } = useSelector((state: RootState) => state.invoices)
  useInfiniteScroll((p: number) => {
    setPage(p)
    return Promise.resolve(p - 1 > invoices.length / 10)
  })
  const overallValues: (OptionType & { type: string })[] = [
    { label: 'invoices:statuses.paid', value: '24', type: 'paid' },
    { label: 'invoices:statuses.outstanding', value: '3', type: 'outstanding' },
    { label: 'invoices:statuses.cancelled', value: '25', type: 'cancelled' }
  ]
  useEffect(() => {
    dispatch({
      type: ACTION_GET_INVOICES_REQUEST,
      payload: {
        page: meta.current_page,
        include: type === userTypes.CLIENT ? 'invoiceFrom' : 'invoiceTo',
        filters
      }
    })
  }, [type])
  return (
    <Styles>
      <Overall>
        {overallValues.map(({ label, type, value }, i) => (
          <Overall.Card label={t(label)} value={value} type={type} key={i} />
        ))}
      </Overall>
      {invoices.slice(0, page * 10).map(
        (
          {
            id,
            due_date,
            client_name,
            status,
            invoice_number
          }: TrainerInvoiceType,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          i
        ) => (
          <Link
            to={Routes.INVOICES + '/' + id}
            key={id}
            className={'invoices__item'}
          >
            <Card className={'invoices__item__card'}>
              <div className={'invoices__item__left'}>
                <div className={'invoices__item__name'}>{client_name}</div>
                <div className={'invoices__item__date'}>{due_date}</div>
              </div>
              <div className={'invoices__item__right'}>
                <div className={'invoices__item__number'}>{invoice_number}</div>
                <div
                  className={classes(
                    'invoices__item__status',
                    status.toLowerCase()
                  )}
                >
                  {status}
                </div>
              </div>
            </Card>
          </Link>
        )
      )}
      {type === userTypes.TRAINER ? <MobileInvoicesFooter /> : null}
      <MobileFilterDrawer />
    </Styles>
  )
}

export default MobileInvoices
