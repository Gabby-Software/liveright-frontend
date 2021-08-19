import {ChatMessageTypeType} from "../types/chat-message-type.type";

export const chatMessageTypes: {[Property in `${Uppercase<ChatMessageTypeType>}`]: `${Lowercase<Property>}`} = {
    TEXT: "text",
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
    FILE: "file",
    REQUEST_SESSION: "request_session",
    SESSION_RESCHEDULE: "session_reschedule",
    INVOICE: "invoice"
}
