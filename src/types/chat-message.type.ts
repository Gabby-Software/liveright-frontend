export type ChatMessageTypeType = 'text' | 'audio' | 'file';
export type ChatMessageMetaType = {
    sent_at: string;
    delivered_at: string;
    read_at: string;
};
export type ChatMessageContentType = {
    content: string;
    file: string;
};

export type ChatMessageType = {
    timestamp: number;
    from_account: number;
    previous_vol: number;
    type: ChatMessageTypeType;
    meta: ChatMessageMetaType;
    content: ChatMessageContentType;
}
