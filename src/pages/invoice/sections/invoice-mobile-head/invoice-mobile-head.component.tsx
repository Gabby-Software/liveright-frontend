import { Popconfirm } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import { ReactComponent as MessagesIcon } from '../../../../assets/media/icons/messages.svg'
import { ReactComponent as MoreIcon } from '../../../../assets/media/icons/more.svg'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import SmallModal, {
  MenuItem
} from '../../../../components/small-modal/small-modal.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAPIData } from '../../../../hoc/api-get'
import { useRemindInvoice } from '../../../../hooks/api/invoices/remind-invoice.hook'
import { useAuth } from '../../../../hooks/auth.hook'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../pipes/classes.pipe'
import { date } from '../../../../pipes/date.pipe'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_MARK_INVOICE_AS_PAID
} from '../../../../store/action-types'
import { InvoiceFullType, InvoiceType } from '../../../../types/invoice.type'
import Styles from './invoice-mobile-head.styles'

type Props = {}
const InvoiceMobileHead = ({}: Props) => {
  const { t } = useTranslation()
  const { data, setData } = useAPIData<InvoiceFullType>()
  const { type } = useAuth()
  const [actionsOpen, setActionsOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [remindLoading, remind] = useRemindInvoice()
  const cancel = () => {
    dispatch({
      type: ACTION_CANCEL_INVOICE_REQUEST,
      payload: {
        id: data.id,
        onSuccess: () =>
          history.replace(
            type === userTypes.CLIENT
              ? Routes.INVOICES
              : Routes.FINANCIALS_RECEIVABLES
          )
      }
    })
  }
  const markAsPaid = () => {
    dispatch({
      type: ACTION_MARK_INVOICE_AS_PAID,
      payload: {
        id: data.id,
        page: 1,
        include: 'invoiceTo',
        onSuccess: (invoice: InvoiceType) => setData({ ...data, ...invoice })
      }
    })
  }
  const downloadPdf = () => {
    fileManager.downloadUrl(
      data.pdf?.url || '',
      `Invoice #${data.invoice_number}.pdf`
    )
  }
  const downloadRecipe = () => {}
  const moreMenu: MenuItem[] = [
    {
      name: t('invoices:print'),
      onClick: window.print
    },
    {
      name: t('invoices:download-pdf'),
      onClick: downloadPdf
    },
    data.status === invoiceStatuses.PAID.toLowerCase()
      ? {
          name: t('invoices:download-recipe'),
          onClick: downloadRecipe
        }
      : {
          name: t('invoices:cancel-invoice'),
          onClick: cancel,
          type: 'primary'
        }
  ]
  return (
    <Styles>
      <div className={'invoice-m-head__left'}>
        <h2 className={'invoice-m-head__price'}>{'902 USD'}</h2>
        <div className={'invoice-m-head__data'}>
          <div className={'invoice-m-head__label'}>
            {t('invoices:issued-on')}:
          </div>
          <div className={'invoice-m-head__value'}>{date(data.created_at)}</div>
        </div>
        <div className={'invoice-m-head__data'}>
          <div className={'invoice-m-head__label'}>
            {t('invoices:invoice-due')}:
          </div>
          <div
            className={classes(
              'invoice-m-head__value',
              moment(data.due_on).isBefore(moment()) &&
                'invoice-m-head__value__error'
            )}
          >
            {date(data.due_on)}
          </div>
        </div>
      </div>
      <div className={'invoice-m-head__right'}>
        <FormButton type={'primary'} className={'invoice-m-head__status'}>
          {t(`invoices:statuses.${data.status}`)}
        </FormButton>
        {data.status === 'paid' ? null : type === userTypes.CLIENT ? (
          <FormButton type={'primary'} className={'invoice-m-head__cta'}>
            {t('invoices:pay')}
          </FormButton>
        ) : (
          <Popconfirm
            title={'Invoice will be marked as paid'}
            onConfirm={() => markAsPaid()}
          >
            <FormButton type={'primary'} className={'invoice-m-head__cta'}>
              {t('invoices:mark-paid')}
            </FormButton>
          </Popconfirm>
        )}
        <div className={'invoice-m-head__icons'}>
          {/*<PrintIcon className={'invoice-m-head__action'} onClick={window.print}/>*/}
          <DownloadIcon className={'invoice-m-head__action'} />
          <MessagesIcon
            onClick={() =>
              remind(data.invoice_to.uuid, {
                invoice_id: '' + data.id,
                total: data.total,
                currency: data.currency.code,
                status: data.status
              })
            }
            className={classes(
              'invoice-m-head__action',
              remindLoading && 'invoice-m-head__action__disabled'
            )}
          />
          {type === userTypes.CLIENT ? null : (
            <MoreIcon
              className={'invoice-m-head__action'}
              onClick={() => setActionsOpen(true)}
            />
          )}
        </div>
      </div>
      <SmallModal
        menu={moreMenu}
        title={t('invoices:options')}
        visible={actionsOpen}
        onCancel={() => setActionsOpen(false)}
      />
    </Styles>
  )
}

export default InvoiceMobileHead
