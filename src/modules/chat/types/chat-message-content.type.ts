import {ChatMessageLinkType} from "./chat-message-link.type";

export type ChatMessageContentType = {
    "text": string,
    "files": string[],
    "embedLinks": ChatMessageLinkType[]
}