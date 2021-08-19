import React, {useState, useEffect, FC} from 'react';
import Styles from './chat-header.styles';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import ChatHeaderMobile from "./chat-header-mobile/chat-header-mobile.component";
import ChatHeaderDesktop from "./chat-header-desktop/chat-header-desktop.component";

type Props = {};
const ChatHeader: FC<Props> = ({}) => {
    const isMobile = useIsMobile();
    return isMobile ? <ChatHeaderMobile/> : <ChatHeaderDesktop/>;
};

export default ChatHeader;
