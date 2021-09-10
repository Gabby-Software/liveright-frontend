import { Routes } from '../../../enums/routes.enum'
import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatPushMessageType } from '../types/chat-push-message.type'

export function getChatNotification(data: ChatPushMessageType) {
  let message = data.message
  switch (data.types[0]) {
    case chatMessageTypes.TEXT:
      message = data.content.message
      break
    case chatMessageTypes.IMAGE:
      message = 'sent you an image'
      break
    case chatMessageTypes.FILE:
      message = 'sent you an attachment'
      break
    case chatMessageTypes.AUDIO:
      message = 'sent a voice message'
      break
    case chatMessageTypes.REQUEST_SESSION:
      message = 'created a new session'
      break
    case chatMessageTypes.INVOICE:
      message = 'sent an invoice reminder'
      break
    case chatMessageTypes.SESSION_RESCHDULE:
      message = 'asked to reschedule a session'
  }
  console.log('MESSAGE PAYLOAD', {
    notification: {
      title: data.message,
      body: message,
      icon: '/maskable_icon_x96.png'
    },
    data: {
      url:
        (process.env.REACT_APP_BASE_URL || '') +
        Routes.CHAT +
        `/${data.room_id}`
    }
  })
  return {
    notification: {
      title: data.message,
      body: message,
      icon: '/maskable_icon_x96.png'
    },
    data: {
      url:
        (process.env.REACT_APP_BASE_URL || '') +
        Routes.CHAT +
        `/${data.room_id}`
    }
  }
}
