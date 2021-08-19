import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-messages-full.styles';
import ChatHeader from "../../chat-header/chat-header.component";
import ChatMessagesBody from "../chat-messages-body/chat-messages-body.component";
import ChatActions from "../../chat-actions/chat-actions.component";

type Props = {};
const ChatMessagesFull: FC<Props> = ({}) => {
    return (
        <Styles>
            <ChatHeader/>
            <ChatMessagesBody/>
            <ChatActions/>
        </Styles>
    );
};

export default ChatMessagesFull;
