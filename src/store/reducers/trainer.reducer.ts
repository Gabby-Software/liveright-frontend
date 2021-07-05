import {TrainerType} from "../../types/trainer.type";
import {withStorage} from "./storage.hook";
import {ActionType} from "../action-types";

const initialValues:TrainerType = {

};

export const trainerReducer = withStorage((state=initialValues, action: ActionType<any>) => {
    return state;
}, initialValues, 'trainer');
