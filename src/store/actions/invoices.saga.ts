import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_CREATE_INVOICE_REQUEST,
    ACTION_GET_INVOICES_ERROR,
    ACTION_GET_INVOICES_LOAD,
    ACTION_GET_INVOICES_REQUEST, ACTION_GET_INVOICES_SUCCESS,
    ACTION_GET_TRAINER_REQUEST,
    ACTION_GET_TRAINER_SUCCESS,
    ActionType
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {AccountObjType} from "../../types/account.type";
import {EP_ADD_INVOICE, EP_GET_INVOICES, EP_GET_TRAINER} from "../../enums/api.enum";
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
}

function* getInvoicesWorker({payload}:ActionType<{page: number, status: string, search: string, include: string}&CallbackType<void>>) {
    yield put({type:ACTION_GET_INVOICES_LOAD});
    const {onSuccess, onError, ...query} = payload;
    try {
        const params = new URLSearchParams({
            ...query,
        } as any).toString();
        const invoices = (yield call(() => api.get(EP_GET_INVOICES+`?${params}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('INVOICES', invoices);
        yield put({type: ACTION_GET_INVOICES_SUCCESS, payload: invoices});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        yield put({type:ACTION_GET_INVOICES_ERROR, payload: serverError(e)});
    }
}

function* createInvoiceWorker({payload}:ActionType<InvoiceFormType&CallbackType<void>&{params:any}>) {
    const {onSuccess, onError, params, ...data} = payload;
    try {
        const res = (yield call(() => api.post(EP_ADD_INVOICE, {
            invoice: data.invoice,
            items: data.items
        }).then(res => res.data))) as string;
        logger.success('Invoice added', res);
        onSuccess && onSuccess();
        yield put({type: ACTION_GET_INVOICES_REQUEST, payload: params});
    } catch (e) {
        onError && onError(serverError(e))
    }
}