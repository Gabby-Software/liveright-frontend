import {withStorage} from "./storage.hook";
import {APIGetType} from "../../hoc/api-get";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {
    ACTION_GET_CLIENTS_ERROR,
    ACTION_GET_CLIENTS_LOAD,
    ACTION_GET_CLIENTS_SUCCESS,
    ActionType
} from "../action-types";
import {AccountObjType, AccountType} from "../../types/account.type";
import {ProfileDataType} from "../../types/profile-data.type";

const initialState: APIGetType<PaginatedDataType<AccountObjType&AccountType&ProfileDataType>> = {
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

export const clientsReducer = withStorage((state = initialState, {type, payload}: ActionType<any>) => {
    switch (type) {
        case ACTION_GET_CLIENTS_SUCCESS:
            return {
                data: payload,
                error: '',
                loading: false
            };
        case ACTION_GET_CLIENTS_LOAD:
            return {
                ...state,
                error: '',
                loading: true
            };
        case ACTION_GET_CLIENTS_ERROR:
            return {
                ...state,
                error: payload || 'some error occur',
                loading: false
            }
    }
    return state;
}, {}, 'clients');