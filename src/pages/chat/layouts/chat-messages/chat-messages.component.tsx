import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-messages.styles';
import ChatMessagesEmpty from "./chat-messages-empty/chat-messages-empty.component";
import {useParams} from "react-router";
import ChatMessagesFull from "./chat-messages-full/chat-messages-full.component";
import {ChatRoomProvider} from "../../../../modules/chat/contexts/chat-room.context";

type Props = {};
const ChatMessages: FC<Props> = ({}) => {
    const {room} = useParams<{room?: string}>();
    return (
        <ChatRoomProvider>
        <Styles>
            {
                room? (
                    <ChatMessagesFull/>
                ): (
                    <ChatMessagesEmpty/>
                )
            }
        </Styles>
        </ChatRoomProvider>
    );
};

export default ChatMessages;
