/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,require-yield */
import { call, put, takeLatest, throttle } from 'redux-saga/effects'

import {
  EP_ADD_INVOICE,
  EP_GET_INVOICES,
  EP_MARK_INVOICE_AS_PAID
} from '../../enums/api.enum'
import api from '../../managers/api.manager'
import logger from '../../managers/logger.manager'
import { InvoiceFormType } from '../../pages/invoices/components/create-invoice/create-invoice.component'
import { serverError } from '../../pipes/server-error.pipe'
import { CallbackType } from '../../types/callback.type'
import { InvoiceType } from '../../types/invoice.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_CREATE_INVOICE_REQUEST,
  ACTION_DOWNLOAD_INVOICE_PDF,
  ACTION_GET_ATTENTION_INVOICES_REQUEST,
  ACTION_GET_ATTENTION_INVOICES_SUCCESS,
  ACTION_GET_INVOICES_ERROR,
  ACTION_GET_INVOICES_LOAD,
  ACTION_GET_INVOICES_REQUEST,
  ACTION_GET_INVOICES_SUCCESS,
  ACTION_GET_TRAINER_REQUEST,
  ACTION_GET_TRAINER_SUCCESS,
  ACTION_MARK_INVOICE_AS_PAID,
  ACTION_UPDATE_INVOICE_FILTERS,
  ActionType
} from '../action-types'

export function* sagaInvoicesWatcher() {
  yield takeLatest(ACTION_GET_INVOICES_REQUEST, getInvoicesWorker)
  yield takeLatest(ACTION_CREATE_INVOICE_REQUEST, createInvoiceWorker)
  yield takeLatest(
    ACTION_GET_ATTENTION_INVOICES_REQUEST,
    getAttentionInvoicesWorker
  )
  yield takeLatest(ACTION_CANCEL_INVOICE_REQUEST, deleteInvoiceWorker)
  yield takeLatest(ACTION_MARK_INVOICE_AS_PAID, markInvoiceAsPaidWorker)
  yield throttle(1000, ACTION_DOWNLOAD_INVOICE_PDF, downloadInvoicePDFWorker)
}
type GetInvoicesActionType<G> = {
  page: number
  filters: {
    status: string
    search: string
    invoice_from?: string
    invoice_to?: string
  }
  include: string
} & CallbackType<G>
function* getInvoicesWorker({
  payload
}: ActionType<GetInvoicesActionType<void>>) {
  yield put({ type: ACTION_GET_INVOICES_LOAD })
  yield put({ type: ACTION_UPDATE_INVOICE_FILTERS, payload: payload.filters })
  const { onSuccess, onError, filters, include, page } = payload
  try {
    const params = `page=${page}&include=${include}&filter[search]=${
      filters.search || ''
    }&filter[status]=${filters.status || ''}&filter[invoice_from]=${
      filters.invoice_from || ''
    }&filter[invoice_to]=${filters.invoice_to || ''}`
    const invoices = (yield call(() =>
      api.get(EP_GET_INVOICES + `?${params}`).then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    logger.success('INVOICES', invoices)
    yield put({ type: ACTION_GET_INVOICES_SUCCESS, payload: invoices })
    payload.onSuccess && payload.onSuccess()
  } catch (e: any) {
    alert(serverError(e))
    yield put({ type: ACTION_GET_INVOICES_ERROR, payload: serverError(e) })
  }
}
function* getAttentionInvoicesWorker({
  payload
}: ActionType<{ include: string }>) {
  try {
    const invoices = (yield call(() =>
      api
        .get(
          EP_GET_INVOICES +
            `?page=1&filter[status]=due_soon,overdue&include=${payload.include}`
        )
        .then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    yield put({
      type: ACTION_GET_ATTENTION_INVOICES_SUCCESS,
      payload: invoices
    })
  } catch (e: any) {
    logger.error('Field to load attention invoices', serverError(e))
  }
}
function* deleteInvoiceWorker({
  payload
}: ActionType<{ id: number } & GetInvoicesActionType<void>>) {
  const { onSuccess, onError, id, filters, include, page } = payload
  try {
    yield call(() => api.delete(EP_GET_INVOICES + `/${id}`))
    if (onSuccess) {
      onSuccess()
    } else {
      const params = `page=${page}&include=${include}&filter[search]=${
        filters?.search || ''
      }&filter[status]=${filters?.status || ''}&filter[invoice_from]=${
        filters?.invoice_from || ''
      }&filter[invoice_to]=${filters?.invoice_to || ''}`
      const invoices = (yield call(() =>
        api.get(EP_GET_INVOICES + `?${params}`).then((res) => res.data)
      )) as PaginatedDataType<InvoiceType>
      yield put({ type: ACTION_GET_INVOICES_SUCCESS, payload: invoices })
    }
  } catch (e) {
    logger.info('cancelling error', e)
  }
}
function* markInvoiceAsPaidWorker({
  payload
}: ActionType<{ id: number } & GetInvoicesActionType<InvoiceType>>) {
  const { id, onSuccess, onError, page, include, filters } = payload
  try {
    const invoice = (yield call(() =>
      api.post(EP_MARK_INVOICE_AS_PAID(id)).then((res) => res.data.data)
    )) as InvoiceType
    if (onSuccess) {
      onSuccess(invoice)
    } else {
      const params = `page=${page}&include=${include}&filter[search]=${
        filters.search || ''
      }&filter[status]=${filters.status || ''}&filter[invoice_from]=${
        filters.invoice_from || ''
      }&filter[invoice_to]=${filters.invoice_to || ''}`
      const invoices = (yield call(() =>
        api.get(EP_GET_INVOICES + `?${params}`).then((res) => res.data)
      )) as PaginatedDataType<InvoiceType>
      yield put({ type: ACTION_GET_INVOICES_SUCCESS, payload: invoices })
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
function* createInvoiceWorker({
  payload
}: ActionType<InvoiceFormType & CallbackType<number> & { params: any }>) {
  const { onSuccess, onError, params, ...data } = payload
  logger.info('CREATE INVOICE WORKER', payload)
  try {
    const res = (yield call(() =>
      api
        .post(EP_ADD_INVOICE, {
          invoice: data.invoice,
          items: data.items
        })
        .then((res) => res.data.data)
    )) as { id: number }
    logger.success('Invoice added', res)
    onSuccess && onSuccess(res.id)
  } catch (e: any) {
    onError && onError(serverError(e))
  }
}

function* downloadInvoicePDFWorker({
  payload
}: ActionType<{ id: number } & CallbackType<InvoiceType>>) {
  logger.info('downloading invoice pdf')
  // const {id, onError, onSuccess} = payload;
  // try {
  //     // const res = (yield call(() => api.post(EP_GET_INVOICE_PDF(id)).then(res => res.data.data))) as InvoiceType;
  //     // logger.success('PDF RES', res);
  //     onSuccess && onSuccess({} as any);
  // } catch(e) {
  //     logger.error('Cannot download invoice', e);
  //     onError && onError(serverError(e))
  // }
}
