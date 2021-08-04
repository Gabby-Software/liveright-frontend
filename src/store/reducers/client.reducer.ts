import {MinimalProfileType} from "../../types/minimal-profile.type";
import {
    ACTION_GET_CLIENT_MINIMAL_SUCCESS, ACTION_GET_FULL_CLIENT_ERROR,
    ACTION_GET_FULL_CLIENT_LOAD,
    ACTION_GET_FULL_CLIENT_SUCCESS, ACTION_UPDATE_CLIENT_SUCCESS,
    ActionType
} from "../action-types";
import {AccountObjType} from "../../types/account.type";
import {APIGetType} from "../../hoc/api-get";
import userTypes from "../../enums/user-types.enum";

const initialValue: APIGetType<AccountObjType|null> = {
    loading: true,
    error: '',
    data: null
};

export function clientReducer(state = initialValue, {type, payload}: ActionType<any>) {
    switch (type) {
        case ACTION_GET_CLIENT_MINIMAL_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload
                }
            };
        case ACTION_UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    accounts: [payload]
                }
            };
        case ACTION_GET_FULL_CLIENT_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            };
        case ACTION_GET_FULL_CLIENT_LOAD:
            return {
                ...state,
                loading: true,
                error:false
            };
        case ACTION_GET_FULL_CLIENT_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}
