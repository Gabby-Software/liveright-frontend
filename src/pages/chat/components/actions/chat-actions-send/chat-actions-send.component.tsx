import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions-send.styles';
import ChatActionsAction from "../chat-actions-action/chat-actions-action.component";
import {ReactComponent as SendIcon} from "../../../../../assets/media/icons/chat-send.svg";

type Props = {};
const ChatActionsSend: FC<Props> = ({}) => {
    return (
        <ChatActionsAction color={'primary'} icon={<SendIcon onClick={e => e.preventDefault()}/>}/>
    );
};

export default ChatActionsSend;
