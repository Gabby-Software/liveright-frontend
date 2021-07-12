import React, {useState, useEffect} from 'react';
import Styles from './sessions.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";

const Sessions = () => {
    const isMobile = useIsMobile();
    if(isMobile)
        return <MobileSessions/>;
    return <DesktopSessions/>;
};

export default Sessions;
