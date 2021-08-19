import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions-text-input.styles';
import ChatActionsEmoji from "../chat-actions-emoji/chat-actions-emoji.component";

type Props = {};
const ChatActionsTextInput: FC<Props> = ({}) => {
    return (
        <Styles>
            <input type={'text'} className={'chat-input__input'} placeholder={'Type your message here'}/>
            <ChatActionsEmoji/>
        </Styles>
    );
};

export default ChatActionsTextInput;
