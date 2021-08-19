import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-actions-emoji.styles';
import {ReactComponent as EmojiIcon} from "../../../../../assets/media/icons/emoji.svg";

type Props = {};
const ChatActionsEmoji: FC<Props> = ({}) => {
    return (
        <Styles>
            <EmojiIcon onClick={e => e.preventDefault()}/>
        </Styles>
    );
};

export default ChatActionsEmoji;
