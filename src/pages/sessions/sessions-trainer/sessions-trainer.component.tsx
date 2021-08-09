import React, {useEffect} from 'react';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";
import {SessionFilter, SessionStatus} from "../../../types/session.type";
import {SessionsState} from "../../../store/reducers/sessions.reducer";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENTS_REQUEST} from "../../../store/action-types";

interface Props {
    sessions: SessionsState;
    getSessions: (status: SessionStatus, filters?: SessionFilter) => (page: number) => void;
}

const Sessions: React.FC<Props> = (props) => {
    const {getSessions, sessions} = props;
    const dispatch = useDispatch();
    const isMobile = useIsMobile();

    useEffect(() => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST,
            payload: {
                status: 'active'
            }
        })
    }, [])

    if(isMobile) {
        return (
            <MobileSessions
                getSessions={getSessions}
                sessions={sessions}
            />
        );
    }

    return (
        <DesktopSessions
            getSessions={getSessions}
            sessions={sessions}
        />
    );
};

export default Sessions;
