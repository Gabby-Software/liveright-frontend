import {withStorage} from "./storage.hook";
import {APIGetType} from "../../hoc/api-get";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {
    ActionType,
    ACTION_GET_PROGRESS_ERROR,
    ACTION_GET_PROGRESS_LOAD,
    ACTION_GET_PROGRESS_SUCCESS,
} from "../action-types";

const initialState: APIGetType<PaginatedDataType<any>> = {
    error: '',
    loading: true,
    data: {
        data: [],
        meta: {
            current_page: 1,
            per_page: 10,
            total: 0
        },
    }
};

export const progressReducer = withStorage((state = initialState, {type, payload}: ActionType<any>) => {
    switch (type) {
        case ACTION_GET_PROGRESS_LOAD:
            return {
                ...state,
                error: '',
                loading: true
            };
        case ACTION_GET_PROGRESS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ACTION_GET_PROGRESS_SUCCESS:
            return {
                ...state,
                data: payload,
                error: '',
                loading: false
            };
    }
    return state;
}, {}, 'progress');
