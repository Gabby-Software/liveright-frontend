import {combineReducers} from 'redux';
import {accountReducer} from './account.reducer';
import {authReducer} from "./auth.reducer";
import {trainerReducer} from "./trainer.reducer";
const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    trainer: trainerReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
