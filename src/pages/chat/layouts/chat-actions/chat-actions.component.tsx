import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions.styles';
import ChatActionsTextInput from "../../components/actions/chat-actions-text-input/chat-actions-text-input.component";
import ChatActionsRecord from "../../components/actions/chat-actions-record/chat-actions-record.component";
import ChatActionsAttachment from "../../components/actions/chat-actions-attachment/chat-actions-attachment.component";
import ChatActionsSend from "../../components/actions/chat-actions-send/chat-actions-send.component";

type Props = {};
const ChatActions: FC<Props> = ({}) => {
    return (
        <Styles>
            <ChatActionsTextInput/>
            <ChatActionsAttachment/>
            <ChatActionsRecord/>
            <ChatActionsSend/>
        </Styles>
    );
};

export default ChatActions;
