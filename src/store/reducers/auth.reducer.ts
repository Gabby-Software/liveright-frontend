import {AccountObjType} from "../../types/account.type";
import {ACTION_LOGIN_SUCCESS, ACTION_REGISTER_SUCCESS, ActionType} from "../action-types";
import {withStorage} from "./storage.hook";
import logger from "../../managers/logger.manager";

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
    uuid: ''
};
export const authReducer = withStorage((state = initialState, {type, payload}: ActionType<any>) => {
    switch(type) {
        case ACTION_LOGIN_SUCCESS:
        case ACTION_REGISTER_SUCCESS:
            logger.info('setting user', payload);
            return payload;
        default:
            return state;
    }
}, initialState, 'auth');