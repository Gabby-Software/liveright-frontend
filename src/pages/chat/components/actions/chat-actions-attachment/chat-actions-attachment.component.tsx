import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions-attachment.styles';
import ChatActionsAction from "../chat-actions-action/chat-actions-action.component";
import {ReactComponent as AttachmentIcon} from "../../../../../assets/media/icons/attachment.svg";

type Props = {};
const ChatActionsAttachment: FC<Props> = ({}) => {
    return (
        <>
            <ChatActionsAction icon={<AttachmentIcon/>}/>
        </>
    );
};

export default ChatActionsAttachment;
