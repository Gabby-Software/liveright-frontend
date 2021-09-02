import { Popconfirm } from 'antd'
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import { ReactComponent as MessagesIcon } from '../../../../assets/media/icons/messages.svg'
import { ReactComponent as PrintIcon } from '../../../../assets/media/icons/print.svg'
import { ReactComponent as TimesIcon } from '../../../../assets/media/icons/times-fill.svg'
import Button from '../../../../components/buttons/button/button.component'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAPIData } from '../../../../hoc/api-get'
import useInvoice from '../../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { addressLine } from '../../../../pipes/address-line.pipe'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { classes } from '../../../../pipes/classes.pipe'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_MARK_INVOICE_AS_PAID
} from '../../../../store/action-types'
import { InvoiceFullType, InvoiceType } from '../../../../types/invoice.type'
import Styles from './invoice-attendees.styles'

const InvoiceAttendees = () => {
  const { t } = useTranslation()
  const { data, refetch, setData } = useAPIData<InvoiceFullType>()
  const { type } = useAuth()
  const history = useHistory()
  const dispatch = useDispatch()
  const { onSend, isSendLoading } = useInvoice()

  const markAsPaid = (id: number) => {
    dispatch({
      type: ACTION_MARK_INVOICE_AS_PAID,
      payload: {
        id,
        page: 1,
        include: 'invoiceTo',
        onSuccess: (invoice: InvoiceType) => setData({ ...data, ...invoice })
      }
    })
  }

  const remove = () => {
    dispatch({
      type: ACTION_CANCEL_INVOICE_REQUEST,
      payload: {
        id: data.id,
        onSuccess: () => {
          history.replace(
            type === userTypes.CLIENT
              ? Routes.INVOICES
              : Routes.FINANCIALS_RECEIVABLES
          )
        }
      }
    })
  }

  const handleSend = async () => {
    await onSend(data.id)
    refetch()
  }

  return (
    <Styles>
      <div className={'invoice-att'}>
        <div className={'invoice-att__title'}>{t('invoices:issued-by')}</div>
        <div className={'invoice-att__name'}>
          {data.invoice_from.user.first_name} {data.invoice_from.user.last_name}
        </div>
        <div className={'invoice-att__desc'}>
          {addressLine(data.invoice_from.address)}
        </div>
      </div>
      <div className={'invoice-att'}>
        <div className={'invoice-att__title'}>{t('invoices:issued-to')}</div>
        <div className={'invoice-att__name'}>
          {data.invoice_to.user.first_name} {data.invoice_to.user.last_name}
        </div>
        <div className={'invoice-att__desc'}>
          {addressLine(data.invoice_to.address)}
        </div>
      </div>
      <div className={'invoice-att__actions'}>
        <FormButton type={'primary'} className={'invoice-att__status'}>
          {capitalize(data.status)}
        </FormButton>
        {data.status === 'paid' ? null : type === userTypes.CLIENT ? (
          <>
            <FormButton type={'primary'} className={'invoice-att__cta'}>
              {t('invoices:pay')}
            </FormButton>
          </>
        ) : data.status === invoiceStatuses.DRAFT ? (
          <Button
            className="invoice-att__send-btn"
            onClick={handleSend}
            disabled={isSendLoading}
          >
            {t('invoices:send-invoice')}
          </Button>
        ) : (
          <>
            <Popconfirm
              title={'Invoice will be marked as paid'}
              onConfirm={() => markAsPaid(data.id)}
            >
              <FormButton type={'primary'} className={'invoice-att__cta'}>
                {t('invoices:mark-paid')}
              </FormButton>
            </Popconfirm>
          </>
        )}
        <div className={'invoice-att__icons'}>
          {type === userTypes.TRAINER && data.status !== 'paid' && (
            <Popconfirm
              title={'Are you sure you want to delete this invoice?'}
              onConfirm={remove}
            >
              <TimesIcon className={'invoice-att__action'} />
            </Popconfirm>
          )}
          <PrintIcon className={'invoice-att__action'} onClick={window.print} />
          <a
            href={data.pdf?.url}
            target={'_blank'}
            download={`invoice-${data.invoice_number}.pdf`}
            rel="noreferrer"
          >
            <DownloadIcon
              className={classes(
                'invoice-att__action',
                !data.pdf && 'invoice-att__action__disabled'
              )}
            />
          </a>
          <Link to={Routes.CHAT}>
            <MessagesIcon className={'invoice-att__action'} />
          </Link>
        </div>
      </div>
      <div className={'invoice-att__print'}>
        <FormButton type={'primary'} className={'invoice-att__status'}>
          {t(`invoices:statuses.${data.status}`)}
        </FormButton>
        <div className={'invoice-att__date'}>
          <i>{`as of ${moment().format('DD-MM-YYYY')}`}</i>
        </div>
      </div>
    </Styles>
  )
}

export default React.memo(InvoiceAttendees)
