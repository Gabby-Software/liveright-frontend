import React from 'react';
import {useDispatch} from "react-redux";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";
import {useSessions} from "../../../hooks/sessions.hook";
import {ACTION_GET_SESSIONS_REQUEST} from "../../../store/action-types";
import {SessionFilter, SessionStatus} from "../../../types/session.type";

const Sessions = () => {
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const {data} = useSessions();

    const getSessions = (status: SessionStatus) => (page: number, filters?: SessionFilter) => {
        dispatch({
            type: ACTION_GET_SESSIONS_REQUEST,
            payload: {
                filters: {...filters, status},
                include: 'client',
                page,
            }
        })
    }

    if(isMobile) {
        return (
            <MobileSessions
                getSessions={getSessions}
                sessions={data}
            />
        );
    }

    return (
        <DesktopSessions
            getSessions={getSessions}
            sessions={data}
        />
    );
};

export default Sessions;
