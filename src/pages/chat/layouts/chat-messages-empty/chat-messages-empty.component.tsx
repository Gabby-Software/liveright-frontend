import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-messages-empty.styles';

type Props = {};
const ChatMessagesEmpty: FC<Props> = ({}) => {
    return (
        <Styles>
            <div className={'messages-empty'}>
                Select a chat to see messages
            </div>
        </Styles>
    );
};

export default ChatMessagesEmpty;
