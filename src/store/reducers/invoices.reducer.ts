import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {withStorage} from "./storage.hook";
import {
    ACTION_GET_INVOICES_ERROR,
    ACTION_GET_INVOICES_LOAD,
    ACTION_GET_INVOICES_SUCCESS,
    ActionType
} from "../action-types";

const initialValues: PaginatedDataType<InvoiceType>&{loading:boolean;error:boolean} = {
    data: [],
    meta: {
        current_page: 1,
        total: 0,
        per_page: 10
    },
    loading: true,
    error: false
};
export const invoicesReducer = withStorage((state=initialValues, {type, payload}:ActionType<any>) => {
    switch(type) {
        case ACTION_GET_INVOICES_SUCCESS:
            return {
                ...payload,
                loading: false,
                error: null
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
