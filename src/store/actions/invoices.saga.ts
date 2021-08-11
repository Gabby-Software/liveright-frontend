import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_CANCEL_INVOICE_REQUEST,
    ACTION_CREATE_INVOICE_REQUEST, ACTION_GET_ATTENTION_INVOICES_REQUEST, ACTION_GET_ATTENTION_INVOICES_SUCCESS,
    ACTION_GET_INVOICES_ERROR,
    ACTION_GET_INVOICES_LOAD,
    ACTION_GET_INVOICES_REQUEST, ACTION_GET_INVOICES_SUCCESS,
    ACTION_GET_TRAINER_REQUEST,
    ACTION_GET_TRAINER_SUCCESS, ACTION_MARK_INVOICE_AS_PAID, ACTION_UPDATE_INVOICE_FILTERS,
    ActionType
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {AccountObjType} from "../../types/account.type";
import {EP_ADD_INVOICE, EP_GET_INVOICES, EP_GET_TRAINER, EP_MARK_INVOICE_AS_PAID} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {serverError} from "../../pipes/server-error.pipe";
import {InvoiceFormType} from "../../pages/invoices/components/create-invoice/create-invoice.component";
import {PaginationMetaType} from "../../types/pagination-meta.type";

export function* sagaInvoicesWatcher() {
    yield throttle(400,ACTION_GET_INVOICES_REQUEST, getInvoicesWorker);
    yield takeLatest(ACTION_CREATE_INVOICE_REQUEST, createInvoiceWorker);
    yield takeLatest(ACTION_GET_ATTENTION_INVOICES_REQUEST, getAttentionInvoicesWorker);
    yield takeLatest(ACTION_CANCEL_INVOICE_REQUEST, deleteInvoiceWorker);
    yield takeLatest(ACTION_MARK_INVOICE_AS_PAID, markInvoiceAsPaidWorker);
}
type GetInvoicesActionType = ActionType<{page: number, filters:{status: string, search: string, invoice_from: string},  include: string}&CallbackType<void>>;
function* getInvoicesWorker({payload}:GetInvoicesActionType) {
    yield put({type:ACTION_GET_INVOICES_LOAD});
    yield put({type:ACTION_UPDATE_INVOICE_FILTERS, payload: payload.filters});
    const {onSuccess, onError, filters,include,page} = payload;
    try {
        const params = `page=${page}&include=${include}&filter[search]=${filters.search||''}&filter[status]=${filters.status||''}&filter[invoice_from]=${filters.invoice_from||''}`;
        const invoices = (yield call(() => api.get(EP_GET_INVOICES+`?${params}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('INVOICES', invoices);
        yield put({type: ACTION_GET_INVOICES_SUCCESS, payload: invoices});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        yield put({type:ACTION_GET_INVOICES_ERROR, payload: serverError(e)});
    }
}
function* getAttentionInvoicesWorker({payload}: ActionType<{ include: string }>) {
    try {
        const invoices = (yield call(() => api.get(EP_GET_INVOICES+`?page=1&filter[status]=due_soon,overdue&include=${payload.include}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        yield put({type: ACTION_GET_ATTENTION_INVOICES_SUCCESS, payload: invoices});
    } catch(e) {
        logger.error('Field to load attention invoices', serverError(e))
    }
}
function* deleteInvoiceWorker({payload}: ActionType<{ id: number, page: number, include: string }& CallbackType<void>>) {
    const {id,onSuccess, onError, ...query} = payload;
    try {
        const params = new URLSearchParams({
            ...query,
        } as any).toString();
        yield call(() => api.delete(EP_GET_INVOICES+`/${id}`));
        if(onSuccess) {
            onSuccess();
        } else {
            const invoices = (yield call(() => api.get(EP_GET_INVOICES+`?${params}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
            yield put({type: ACTION_GET_INVOICES_SUCCESS, payload: invoices});
        }
    } catch(e) {
    }
}
function* markInvoiceAsPaidWorker({payload}: ActionType<{ id: number, page: number, include: string }&CallbackType<InvoiceType>>) {
    const {id, onSuccess, onError, ...query} = payload;
    try {
        const params = new URLSearchParams({
            ...query,
        } as any).toString();
        const invoice = (yield call(() => api.post(EP_MARK_INVOICE_AS_PAID(id)).then(res => res.data.data))) as InvoiceType;
        if(onSuccess) {
            onSuccess(invoice)
        } else {
            const invoices = (yield call(() => api.get(EP_GET_INVOICES+`?${params}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
            yield put({type: ACTION_GET_INVOICES_SUCCESS, payload: invoices});
        }

    } catch(e) {
    }
}
function* createInvoiceWorker({payload}:ActionType<InvoiceFormType&CallbackType<number>&{params:any}>) {
    const {onSuccess, onError, params, ...data} = payload;
    logger.info("CREATE INVOICE WORKER", payload);
    try {
        const res = (yield call(() => api.post(EP_ADD_INVOICE, {
            invoice: data.invoice,
            items: data.items
        }).then(res => res.data.data))) as {id: number};
        logger.success('Invoice added', res);
        onSuccess && onSuccess(res.id);
    } catch (e) {
        onError && onError(serverError(e))
    }
}