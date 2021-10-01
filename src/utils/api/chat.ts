export function getUnreadCount(rooms: any): number {
  try {
    let unread = 0

    Object.values(rooms).forEach((room) => {
      unread += (room as any)?.room.unReadMessagesCount || 0
    })

    return unread
  } catch (e) {
    return 0
  }
}
