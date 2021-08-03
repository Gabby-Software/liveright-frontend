import {MinimalProfileType} from "../../types/minimal-profile.type";
import {ACTION_GET_CLIENT_MINIMAL_SUCCESS, ActionType} from "../action-types";

const initialValue: MinimalProfileType = {
    first_name: '',
    last_name: '',
    avatar: null
};

export function clientReducer(state = initialValue, {type, payload}: ActionType<any>) {
    switch (type) {
        case ACTION_GET_CLIENT_MINIMAL_SUCCESS:
            return payload;
        default:
            return state;
    }
}
