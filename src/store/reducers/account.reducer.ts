import {ProfileDataType} from "../../types/profile-data.type";
import * as actions from "../action-types";
import {withStorage} from "./storage.hook";

const initialState: ProfileDataType = {
    phone_number: '',
    address: '',
    city:'',
    country:'',
    dietary_restrictions: '',
    injuries: '',
    notes: '',
    custom_url: '',
    about: '',
    qualifications: '',
    additional_information: '',
    payment_info: {
        bank: '',
        branch_name:'',
        account_number: '',
        name_on_account: '',
        tax_id: ''
    },
    tnb: {
        name: '',
        url: '',
        ext: ''
    }
};

export const accountReducer = withStorage((state = initialState, action: actions.ActionType<any>) => {
    switch (action.type) {
        case actions.ACTION_GET_ACCOUNT_SUCCESS:
        case actions.ACTION_UPDATE_ACCOUNT_SUCCESS:
            // return {
            //     ...state,
            //     ...action.payload
            // };
        case actions.ACTION_GET_ACCOUNT_ERROR:
        case actions.ACTION_UPDATE_ACCOUNT_ERROR:
        default:
            return state;
    }
}, initialState, 'account');
