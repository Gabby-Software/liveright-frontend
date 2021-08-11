import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {withStorage} from "./storage.hook";
import {
    ACTION_GET_ATTENTION_INVOICES_SUCCESS,
    ACTION_GET_INVOICES_ERROR,
    ACTION_GET_INVOICES_LOAD,
    ACTION_GET_INVOICES_SUCCESS, ACTION_UPDATE_INVOICE_FILTERS,
    ActionType
} from "../action-types";

export type InvoicesFilters = {
    search: string;
    status: string;
    invoice_from: string;
}
export type InvoicesReducerType = {
    needAttention: PaginatedDataType<InvoiceType>,
    filters: InvoicesFilters,
    current: PaginatedDataType<InvoiceType>,
    loading: boolean;
    error: string;
}
const initialValues: InvoicesReducerType = {
    needAttention: {
        data: [],
        meta: {
            current_page: 1,
            total: 0,
            per_page: 10
        }
    },
    filters: {
        search: '',
        status: '',
        invoice_from: ''
    },
    current: {
        data: [],
        meta: {
            current_page: 1,
            total: 0,
            per_page: 10
        },
    },
    loading: true,
    error: ''
};
export const invoicesReducer = withStorage((state = initialValues, {type, payload}: ActionType<any>) => {
    switch (type) {
        case ACTION_GET_INVOICES_SUCCESS:
            return {
                ...state,
                current: payload,
                loading: false,
                error: null
            };
        case ACTION_GET_ATTENTION_INVOICES_SUCCESS:
            return {
                ...state,
                needAttention: payload,
            };
        case ACTION_UPDATE_INVOICE_FILTERS:
            return {
                ...state,
                filters: payload
            };
        case ACTION_GET_INVOICES_LOAD:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTION_GET_INVOICES_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}, initialValues, 'invoices');
