import {ACTION_INIT, ActionType} from "../action-types";
import logger from "../../managers/logger.manager";

export const withStorage = (reducer: (state: any, action: ActionType<any>) => {}, initialState: any, key: string) => (state: any, action: any) => {
    logger.info('ACTION', action.type, state);
    if (action.type.startsWith(ACTION_INIT)) {
        const savedState = localStorage.getItem(key);
        if (savedState) {
            logger.info('ACTION reseting state from ' + key, savedState)
            return JSON.parse(savedState);
        }
    }
    const newState = reducer(state, action);
    if (!action.type.startsWith('@@redux'))
        localStorage.setItem(key, JSON.stringify(newState));
    return newState;
};
