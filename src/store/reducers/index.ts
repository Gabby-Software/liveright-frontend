import {combineReducers} from 'redux';
import {accountReducer} from './account.reducer';
import {authReducer} from "./auth.reducer";
import {trainerReducer} from "./trainer.reducer";
import {invoicesReducer} from "./invoices.reducer";
import {clientsReducer} from "./clients.reducer";
const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    trainer: trainerReducer,
    invoices: invoicesReducer,
    clients: clientsReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
