// https://documenter.getpostman.com/view/8741108/Tzeak6s7#intro
export const ALLRIGHT_BASE = process.env.REACT_APP_BASE_ALLRIGHT_URL
export const LIVERIGHT_BASE = process.env.REACT_APP_BASE_API_URL
export const EP_LOGOUT = '/logout'
export const EP_UPDATE_USER = ALLRIGHT_BASE + '/user'
export const EP_UPDATE_PROFILE = ALLRIGHT_BASE + '/user/profile'
export const EP_GET_USER = ALLRIGHT_BASE + '/user'
export const EP_UPDATE_TNB = ALLRIGHT_BASE + '/user/profile/terms_conditions'
export const EP_UPDATE_AVATAR = ALLRIGHT_BASE + '/user/avatar'
export const EP_ADD_ACCOUNT = ALLRIGHT_BASE + '/user/account'
export const EP_GET_COUNTRIES = ALLRIGHT_BASE + '/countries'
export const EP_CHECK_EMAIL_EXIST = ALLRIGHT_BASE + '/invitations/check'
export const EP_INVITE_NEW_USER = ALLRIGHT_BASE + '/invitations'
// export const EP_GET_TRAINER = ALLRIGHT_BASE + '/training/trainer'
export const EP_GET_TRAINER = LIVERIGHT_BASE + '/training/trainer-users'
export const EP_GET_CLIENTS = LIVERIGHT_BASE + '/training/client-users'
// export const EP_GET_CLIENTS = ALLRIGHT_BASE + '/training/clients'
export const EP_GET_SESSIONS = '/sessions'
export const EP_HEALTH_DATA_LOGS = '/health-data-logs'
export const EP_MEASUREMENTS = '/measurements'
export const EP_GOALS = '/goal-targets'
export const EP_PUSHER_BEAMS_AUTH = ALLRIGHT_BASE + '/pusher/beams-auth'
export const EP_PUSHER_CHANNEL_AUTH = ALLRIGHT_BASE + '/pusher/auth'
export const EP_FILES = '/files'

export const EP_GET_INVOICES = ALLRIGHT_BASE + '/invoices'
export const EP_ADD_INVOICE = ALLRIGHT_BASE + '/invoices'
export const EP_EDIT_INVOICE = ALLRIGHT_BASE + '/invoices'
export const EP_GET_INVOICE_ISSUERS =
  ALLRIGHT_BASE + '/invoices/associated-accounts'
export const EP_MARK_INVOICE_AS_PAID = (id: number) =>
  ALLRIGHT_BASE + `/invoices/${id}/mark-as-paid`
export const EP_GET_INVOICE_PDF = (id: number) =>
  ALLRIGHT_BASE + `/invoices/${id}/generate-pdf`

export const EP_ADD_NOTIFICATION = ALLRIGHT_BASE + '/notifications/test'
export const EP_GET_NOTIFICATIONS = ALLRIGHT_BASE + '/notifications/all'
export const EP_UNREAD_NOTIFICATIONS_COUNT =
  ALLRIGHT_BASE + '/notifications/unread/count'
export const EP_GET_UNREAD_NOTIFICATIONS =
  ALLRIGHT_BASE + '/notifications/unread'
export const EP_READ_ALL_NOTIFICATIONS =
  ALLRIGHT_BASE + '/notifications/mark-all-as-read'
export const EP_READ_NOTIFICATION = (id: string) =>
  ALLRIGHT_BASE + `/notifications/${id}/mark-as-read`
export const EP_SETTINGS = ALLRIGHT_BASE + `/user/settings`
export const EP_CREDITS = LIVERIGHT_BASE + '/credits'
export const EP_ACCOUNT_BY_ID = ALLRIGHT_BASE + '/user/accounts'

export const EP_STATISTIC_AR = ALLRIGHT_BASE + '/analytics/stats'
export const EP_STATISTIC_LR = LIVERIGHT_BASE + '/analytics/stats'

export const EP_PAYMENT_ACCOUNT = ALLRIGHT_BASE + '/stripe/connect/account'
export const EP_PAYMENT_CREATE_ACCOUNT =
  ALLRIGHT_BASE + '/stripe/connect/onboarding'
export const EP_PAYMENT_UNLINK_STRIPE = ALLRIGHT_BASE + '/stripe/connect/delete'
export const EP_PAYMENT_CREATE_LINK =
  ALLRIGHT_BASE + '/stripe/connect/account-link'
export const EP_PAYMENT_CREATE_STRIPE_DASHBOARD_LINK =
  ALLRIGHT_BASE + '/stripe/connect/dashboard-link'
export const EP_STRIPE_AVAILABLE_BALANCE =
  ALLRIGHT_BASE + '/stripe/connect/balance'
export const EP_STRIPE_CREATE_PAYOUT = ALLRIGHT_BASE + '/stripe/connect/payouts'
export const EP_PAYOUT_TRANSACTIONS =
  ALLRIGHT_BASE + '/stripe/connect/balance-transactions'
export const EP_UPDATE_GOALS_TARGET = LIVERIGHT_BASE + '/goal-targets'
export const EP_CALENDAR = LIVERIGHT_BASE + '/calendar'
