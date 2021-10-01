import { useChats } from '../../../modules/chat/contexts/chats.context'
import { getUnreadCount } from '../../../utils/api/chat'

interface UseChatUnread {
  unread: number
}

export default function useChatUnread(): UseChatUnread {
  const { rooms } = useChats()
  const unread = getUnreadCount(rooms)
  return {
    unread
  }
}
