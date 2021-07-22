import {TrainerType} from "../../types/trainer.type";
import {withStorage} from "./storage.hook";
import {ACTION_GET_TRAINER_SUCCESS, ActionType} from "../action-types";
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {AccountObjType} from "../../types/account.type";

const initialValues: AccountObjType|null = null;

export const trainerReducer = withStorage((state=initialValues, {type, payload}: ActionType<any>) => {
    switch(type) {
        case ACTION_GET_TRAINER_SUCCESS:
            return payload;
        default:
            return state;
    }
}, initialValues, 'trainer');
