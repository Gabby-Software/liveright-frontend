import { ChatFileType } from '../types/chat-file.type'

export function toFileType(url: string, file: File): ChatFileType {
  return {
    url,
    size: file.size,
    mimetype: file.type,
    original_name: file.name
  }
}
