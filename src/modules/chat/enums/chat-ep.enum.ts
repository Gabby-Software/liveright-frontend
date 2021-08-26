const BASE = process.env.REACT_APP_CHAT_BASE_URL
export const Chat_EP = Object.freeze({
  USERS: `${BASE}/users`,
  MESSAGES: (roomId: string) => `${BASE}/messages/${roomId}`,
  UPLOAD: `${BASE}/upload`,
  CREATE_ROOM: `${BASE}/chatrooms`,
  CLOSE_ROOM: `${BASE}/chatrooms/action`
})
