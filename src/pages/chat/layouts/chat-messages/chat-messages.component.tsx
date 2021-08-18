import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-messages.styles';
import ChatMessagesEmpty from "../chat-messages-empty/chat-messages-empty.component";

type Props = {};
const ChatMessages: FC<Props> = ({}) => {
    return (
        <Styles>
            <ChatMessagesEmpty/>
        </Styles>
    );
};

export default ChatMessages;
