import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";
import {SessionFilter, SessionStatus} from "../../../types/session.type";
import {SessionsState} from "../../../store/reducers/sessions.reducer";
import {ACTION_GET_CLIENTS_REQUEST, ACTION_TRAINER_REMOVE_SESSION_REQUEST} from "../../../store/action-types";

interface Props {
    sessions: SessionsState;
    getSessions: (status: SessionStatus) => (page: number, filter?: SessionFilter) => void;
}

const Sessions: React.FC<Props> = (props) => {
    const {getSessions, sessions} = props;
    const dispatch = useDispatch();
    const isMobile = useIsMobile();

    const handleFilterByClient = (id: number) => {
        getSessions('upcoming')(1, {client_id: id})
        getSessions('awaiting_scheduling')(1, {client_id: id})
        getSessions('past')(1, {client_id: id})
    }

    const handleRemoveSession = (id: number) => {
        dispatch({
            type: ACTION_TRAINER_REMOVE_SESSION_REQUEST,
            payload: { id }
        })
    }

    useEffect(() => {
        dispatch({
            type: ACTION_GET_CLIENTS_REQUEST,
            payload: { status: 'active' }
        })
        getSessions('awaiting_scheduling')(1)
    }, [])

    if(isMobile) {
        return (
            <MobileSessions
                getSessions={getSessions}
                onFilterByClient={handleFilterByClient}
                onRemoveSession={handleRemoveSession}
                sessions={sessions}
            />
        );
    }

    return (
        <DesktopSessions
            getSessions={getSessions}
            onFilterByClient={handleFilterByClient}
            onRemoveSession={handleRemoveSession}
            sessions={sessions}
        />
    );
};

export default Sessions;
