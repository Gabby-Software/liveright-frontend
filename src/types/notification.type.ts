export type NotificationTypeType = 'invoice' | 'session' | 'exercise' | 'meal'
export type NotificationType = {
  datetime: string
  type: NotificationTypeType
  content: string
  seen: boolean
  url: string
}
