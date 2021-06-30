import {combineReducers} from 'redux';
import {accountReducer} from './account.reducer';
import {authReducer} from "./auth.reducer";
const rootReducer = combineReducers({
    account: accountReducer,
    auth: authReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
