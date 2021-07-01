import {ProfileDataType} from "../../types/profile-data.type";
import * as actions from "../action-types";

const initialState: ProfileDataType = {
    phone_number: '',
    address: '',
    dietary_restrictions: '',
    injuries: '',
    notes: '',
    custom_url: ''
};

export function accountReducer(state = initialState, action: actions.ActionType<any>) {
    switch (action.type) {
        case actions.ACTION_GET_ACCOUNT_SUCCESS:
        case actions.ACTION_UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case actions.ACTION_GET_ACCOUNT_ERROR:
        case actions.ACTION_UPDATE_ACCOUNT_ERROR:
        default:
            return state;
    }
}
