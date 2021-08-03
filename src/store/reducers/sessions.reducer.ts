import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {withStorage} from "./storage.hook";
import {
    ACTION_GET_INVOICES_ERROR,
    ACTION_GET_INVOICES_LOAD,
    ACTION_GET_INVOICES_SUCCESS, ACTION_GET_SESSIONS_ERROR, ACTION_GET_SESSIONS_LOAD, ACTION_GET_SESSIONS_SUCCESS,
    ActionType
} from "../action-types";
import {APIGetType} from "../../hoc/api-get";

const initialValues: APIGetType<PaginatedDataType<InvoiceType>> = {
    data: {
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
export const sessionsReducer = withStorage((state=initialValues, {type, payload}:ActionType<any>) => {
    switch(type) {
        case ACTION_GET_SESSIONS_SUCCESS:
            return {
                data: payload,
                loading: false,
                error: null
            };
        case ACTION_GET_SESSIONS_LOAD:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTION_GET_SESSIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}, initialValues, 'sessions');
