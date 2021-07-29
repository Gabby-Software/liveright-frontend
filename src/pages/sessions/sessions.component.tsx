import React, {useState, useEffect} from 'react';
import Styles from './sessions.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";
import AddSession from "./sections/add-session/add-session.component";

const Sessions = () => {
    const isMobile = useIsMobile();
    return (
        <>
            {
                isMobile?<MobileSessions/>:<DesktopSessions/>
            }
            <AddSession isOpen={true} onClose={() => {}}/>
        </>
    );
};

export default Sessions;
