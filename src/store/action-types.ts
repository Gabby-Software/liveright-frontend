export type ActionType<G> = {
    type: string;
    payload: G;
}
export const ACTION_INIT = '@@redux/INIT';
export const ACTION_LOGIN_REQUEST = 'action-login-request';
export const ACTION_LOGIN_SUCCESS = 'action-login-success';
export const ACTION_REGISTER_REQUEST = 'action-register-request';
export const ACTION_REGISTER_SUCCESS = 'action-register-success';
export const ACTION_UPDATE_AUTH_REQUEST = 'action-update-auth-request';
export const ACTION_UPDATE_AUTH_SUCCESS = 'action-update-auth-success';
export const ACTION_LOGOUT_REQUEST = 'action-logout-request';
export const ACTION_VERIFY_EMAIL_REQUEST = 'action-verify-email-request';
export const ACTION_VERIFY_EMAIL_RESEND_REQUEST = 'action-verify-email-resend-request';
export const ACTION_RESET_PASSWORD_REQUEST = 'reset-password-request';
export const ACTION_GET_ACCOUNT_REQUEST = 'action-get-account-request';
export const ACTION_GET_ACCOUNT_SUCCESS = 'action-get-account-success';
export const ACTION_GET_ACCOUNT_ERROR = 'action-get-account-error';
export const ACTION_UPDATE_ACCOUNT_REQUEST = 'action-update-account-request';
export const ACTION_UPDATE_ACCOUNT_SUCCESS = 'action-update-account-success';
export const ACTION_UPDATE_ACCOUNT_ERROR = 'action-update-account-error';
export const ACTION_GET_TRAINER_REQUEST = 'action-get-trainer-request';
export const ACTION_GET_TRAINER_SUCCESS = 'action-get-trainer-success';
export const ACTION_SWITCH_ACCOUNT_REQUEST = 'action-switch-account-request';
export const ACTION_SWITCH_ACCOUNT_SUCCESS = 'action-switch-account-success';
export const ACTION_ADD_ACCOUNT_REQUEST = 'action-add-account-request';
export const ACTION_ADD_ACCOUNT_SUCCESS = 'action-add-account-success';
export const ACTION_UPDATE_PROFILE_REQUEST = 'action-update-user-request';
export const ACTION_GET_INVOICES_REQUEST = 'action-get-invoices-request';
export const ACTION_GET_INVOICES_SUCCESS = 'action-get-invoices-success';
export const ACTION_GET_INVOICES_LOAD = 'action-get-invoices-load';
export const ACTION_GET_INVOICES_ERROR = 'action-get-invoices-error';
export const ACTION_CREATE_INVOICE_REQUEST = 'action-create-invoice-request';
export const ACTION_CREATE_INVOICE_SUCCESS = 'action-create-invoice-success';
export const ACTION_GET_CLIENTS_REQUEST = 'action-get-clients-request';
export const ACTION_GET_CLIENTS_SUCCESS = 'action-get-clients-success';
export const ACTION_GET_CLIENTS_LOAD = 'action-get-clients-load';
export const ACTION_GET_CLIENTS_ERROR = 'action-get-clients-error';
export const ACTION_GET_FULL_CLIENT_REQUEST = 'action-get-full-client-request';
export const ACTION_GET_FULL_CLIENT_SUCCESS = 'action-get-full-client-success';
export const ACTION_GET_FULL_CLIENT_LOAD = 'action-get-full-client-load';
export const ACTION_GET_FULL_CLIENT_ERROR = 'action-get-full-client-error';
export const ACTION_UPDATE_CLIENT_REQUEST = 'action-update-client-request';
export const ACTION_UPDATE_CLIENT_SUCCESS = 'action-update-client-success';
export const ACTION_UPDATE_CLIENTS_FILTERS = 'action-update-clients-filters';
export const ACTION_GET_SESSIONS_REQUEST = 'action-get-sessions-request';
export const ACTION_GET_SESSIONS_SUCCESS = 'action-get-sessions-success';
export const ACTION_GET_SESSIONS_LOAD = 'action-get-sessions-load';
export const ACTION_GET_SESSIONS_ERROR = 'action-get-sessions-error';
export const ACTION_GET_CLIENT_MINIMAL_REQUEST = 'action-get-client-minimal-request';
export const ACTION_GET_CLIENT_MINIMAL_SUCCESS = 'action-get-client-minimal-success';
