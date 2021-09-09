export const CHAT_DOMAIN =
  'https://' + process.env.REACT_APP_CHAT_BASE_URL + '/api'
export const Chat_EP = Object.freeze({
  USERS: `${CHAT_DOMAIN}/users`,
  MESSAGES: (roomId: string) => `${CHAT_DOMAIN}/messages/${roomId}`,
  UPLOAD: `${CHAT_DOMAIN}/upload`,
  CREATE_ROOM: `${CHAT_DOMAIN}/chatrooms`,
  CLOSE_ROOM: `${CHAT_DOMAIN}/chatrooms/action`,
  DELETE: (roomID: string, msgID: string) =>
    `${CHAT_DOMAIN}/messages/${roomID}/${msgID}`,
  GET_LINK_META: `${CHAT_DOMAIN}/messages/embed`
})
