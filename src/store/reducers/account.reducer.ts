import {ProfileDataType} from "../../types/profile-data.type";
import profilePlaceholder from "../../assets/media/profile-placeholder.png";
import * as actions from "../action-types";

const initialState: ProfileDataType = {
    image: '',
    gender: 'male',
    first_name: 'Chris',
    last_name: 'Hemsingworth',
    birth_date: '12/03/2021',
    join_date: '13-04-2021',
    email: 'Chrisheming@gmail.com',
    phone: '+333 020392093',
    address: '18, EM 595, Centro, Pinhel. Portugal',
    dietary_restrictions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum gravida purus, eget sollicitudin est eleifend in.',
    injuries: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum gravida purus, eget sollicitudin est eleifend in.'
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
