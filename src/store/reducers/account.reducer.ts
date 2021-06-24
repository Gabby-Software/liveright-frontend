import {ProfileDataType} from "../../types/profile-data.type";
import profilePlaceholder from "../../assets/media/profile-placeholder.png";
import * as actions from "../action-types";

const initialState: ProfileDataType = {
    image: profilePlaceholder,
    first_name: 'Chris',
    last_name: 'Hemsingworth',
    join_date: '13-04-2021',
    email: 'Chrisheming@gmail.com',
    phone: '+333 020392093',
    address: '18, EM 595, Centro, Pinhel. Portugal',
    dietary_restrictions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum gravida purus, eget sollicitudin est eleifend in.',
    injuries: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum gravida purus, eget sollicitudin est eleifend in.'
};

export function accountReducer(state = initialState, action: actions.ActionType) {
    switch (action.type) {
        case actions.ACTION_ACCOUNT_REQUEST:
        case actions.ACTION_ACCOUNT_SUCCESS:
        case actions.ACTION_ACCOUNT_ERROR:
        default:
            return state;
    }
}
