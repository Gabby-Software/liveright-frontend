import {ChatMessageMetaType} from "./chat-message-meta.type";
import {ChatMessageTypeType} from "./chat-message-type.type";
import {ChatMessageContentType} from "./chat-message-content.type";

export type ChatMessageType =   {
    "meta": ChatMessageMetaType,
    "content": ChatMessageContentType,
    "types": ChatMessageTypeType[],
    "_id": string,
    "senderId": string,
    "receiverId": string,
    "chat_room_id": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}