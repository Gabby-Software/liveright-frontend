// https://documenter.getpostman.com/view/8741108/Tzeak6s7#intro
export const ALLRIGHT_BASE = process.env.REACT_APP_BASE_ALLRIGHT_URL;
export const EP_LOGOUT = '/logout';
export const EP_UPDATE_USER = ALLRIGHT_BASE+'/user';
export const EP_UPDATE_PROFILE = ALLRIGHT_BASE+'/user/profile';
export const EP_GET_USER = ALLRIGHT_BASE+'/user';
export const EP_UPDATE_TNB = ALLRIGHT_BASE+'/user/profile/terms_conditions';
export const EP_UPDATE_AVATAR = ALLRIGHT_BASE+'/user/avatar';
export const EP_ADD_ACCOUNT = ALLRIGHT_BASE+'/user/account';
export const EP_GET_COUNTRIES = ALLRIGHT_BASE+'/countries';
export const EP_ADD_NOTIFICATION = ALLRIGHT_BASE+'/notifications/test';
export const EP_GET_NOTIFICATIONS = ALLRIGHT_BASE+'/notifications/all';
export const EP_GET_UNREAD_NOTIFICATIONS = ALLRIGHT_BASE+'/notifications/unread';
export const EP_CHECK_EMAIL_EXIST = ALLRIGHT_BASE+'/invitations/check';
export const EP_INVITE_NEW_USER = ALLRIGHT_BASE+'/invitations';
export const EP_GET_TRAINER = ALLRIGHT_BASE+'/training/trainer';
export const EP_GET_CLIENTS = ALLRIGHT_BASE+'/training/clients';
export const EP_GET_INVOICES = ALLRIGHT_BASE+'/invoices';
export const EP_ADD_INVOICE = ALLRIGHT_BASE+'/invoices';
export const EP_GET_INVOICE_ISSUERS=ALLRIGHT_BASE+'/invoices/associated-accounts';
export const EP_MARK_INVOICE_AS_PAID = (id:number) => ALLRIGHT_BASE+`/invoices/${id}/mark-as-paid`;
export const EP_GET_SESSIONS = '/sessions';
export const EP_PUSHER_AUTH = ALLRIGHT_BASE+'/pusher/beams-auth';

