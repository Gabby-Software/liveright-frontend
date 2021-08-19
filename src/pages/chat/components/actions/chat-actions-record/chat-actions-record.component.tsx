import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions-record.styles';
import ChatActionsAction from "../chat-actions-action/chat-actions-action.component";
import {ReactComponent as MicrophonIcon} from "../../../../../assets/media/icons/microphon.svg";

type Props = {};
const ChatActionsRecord: FC<Props> = ({}) => {
    return (
         <ChatActionsAction icon={<MicrophonIcon onClick={e => e.preventDefault()}/>}/>
    );
};

export default ChatActionsRecord;
