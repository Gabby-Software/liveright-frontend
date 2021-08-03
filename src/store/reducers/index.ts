import {combineReducers} from 'redux';
import {accountReducer} from './account.reducer';
import {authReducer} from "./auth.reducer";
import {trainerReducer} from "./trainer.reducer";
import {invoicesReducer} from "./invoices.reducer";
import {clientsReducer} from "./clients.reducer";
import {clientReducer} from "./client.reducer";
import {sessionsReducer} from "./sessions.reducer";
const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
    trainer: trainerReducer,
    invoices: invoicesReducer,
    clients: clientsReducer,
    client: clientReducer,
    sessions: sessionsReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
