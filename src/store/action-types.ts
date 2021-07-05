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
