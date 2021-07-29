import {combineReducers} from 'redux';
import {accountReducer} from './account.reducer';
import {authReducer} from "./auth.reducer";
import {trainerReducer} from "./trainer.reducer";
import {invoicesReducer} from "./invoices.reducer";
const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    trainer: trainerReducer,
    invoices: invoicesReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
