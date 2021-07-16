import {AccountObjType, AccountType} from "../../types/account.type";
import {
    ACTION_ADD_ACCOUNT_SUCCESS,
    ACTION_LOGIN_SUCCESS,
    ACTION_REGISTER_SUCCESS, ACTION_SWITCH_ACCOUNT_REQUEST, ACTION_SWITCH_ACCOUNT_SUCCESS,
    ACTION_UPDATE_ACCOUNT_SUCCESS,
    ACTION_UPDATE_AUTH_SUCCESS,
    ActionType
} from "../action-types";
import {withStorage} from "./storage.hook";
import logger from "../../managers/logger.manager";
import {withCookies} from "./cookies.hook";

const initialState: AccountObjType = {
    accounts: [],
    avatar: null,
    avatar_thumb: null,
    birthday: null,
    created_at: '',
    email: '',
    email_verified_at: null,
    first_name: '',
    last_name: '',
    gender: null,
    is_active: false,
    uuid: '',
    city: '',
    country: null,
};
export const authReducer = withCookies((state = initialState, {type, payload}: ActionType<any>) => {
    switch(type) {
        case ACTION_LOGIN_SUCCESS:
        case ACTION_REGISTER_SUCCESS:
            logger.info('setting user', payload);
            return payload;
        case ACTION_UPDATE_AUTH_SUCCESS:
            logger.info('updating user', payload);
            return {
                ...state,
                ...payload
            };
        case ACTION_UPDATE_ACCOUNT_SUCCESS:
            logger.info('UPDATE ACCOUNT', payload);
            const accountIndex = state.accounts.findIndex((a: AccountType) => a.is_current);
            if(accountIndex !== -1) {
                state.accounts[accountIndex] = {...payload, is_current:true};
            }
            return {...state};
        case ACTION_ADD_ACCOUNT_SUCCESS:
            return {
              ...state,
              accounts: [
                  ...state.accounts.map((acc:AccountType) => ({...acc, is_current: false})),
                  {...payload,is_current: true}
              ]
            };
        case ACTION_SWITCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                accounts: state.accounts.map((acc: AccountType) => ({...acc, is_current: acc.uuid === payload}))
            };
        default:
            return state;
    }
}, initialState, 'auth');
