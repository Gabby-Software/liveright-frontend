import { combineReducers } from 'redux'

import { accountReducer } from './account.reducer'
import { authReducer } from './auth.reducer'
import { clientReducer } from './client.reducer'
import { clientsReducer } from './clients.reducer'
import { invoicesReducer } from './invoices.reducer'
import { notificationsReducer } from './notifications.reducer'
import { progressReducer } from './progress.reducer'
import { sessionsReducer } from './sessions.reducer'
import { trainerReducer } from './trainer.reducer'
const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  trainer: trainerReducer,
  invoices: invoicesReducer,
  clients: clientsReducer,
  client: clientReducer,
  sessions: sessionsReducer,
  progress: progressReducer,
  notifications: notificationsReducer
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
