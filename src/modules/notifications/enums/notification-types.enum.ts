export enum notificationsTypes {
  INVITATION_ACCEPT = 'invitation_accepted_notification',
  INVITATION_REJECT = 'invitation_rejected_notification',
  INVITATION_RECEIVED = 'training_invitation',
  INVOICE_STATUS_CHANGED = 'invoice_status_changed_notification',
  INVOICE_CREATED = 'invoice_created_notification',
  SESSION_REQUESTED = 'client_requested_session',
  SESSION_CREATED = 'trainer_scheduled_session',
  SESSION_UPDATED = 'trainer_updated_session',
  SESSION_DELETED = 'trainer_deleted_session',
  SESSION_REMIND = 'p_t_session_reminder',
  CREDITS_DEPOSITED = 'credits_deposited',
  NEW_CHAT_MESSAGE = 'new_message_notification'
}
