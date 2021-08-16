import React, {useEffect} from 'react';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import MobileSessions from "./mobile-sessions/mobile-sessions.component";
import DesktopSessions from "./desktop-sessions/desktop-sessions.component";
import {SessionsState} from "../../../store/reducers/sessions.reducer";
import {SessionFilter, SessionStatus} from "../../../types/session.type";
import {useTrainerSelector} from "../../../hooks/trainer.hook";
import {useDispatch} from "react-redux";
import {ACTION_GET_TRAINER_REQUEST} from "../../../store/action-types";

interface Props {
    sessions: SessionsState;
    getSessions: (status: SessionStatus) => (page: number, filter?: SessionFilter) => void;
}

const Sessions: React.FC<Props> = (props) => {
    const {getSessions, sessions} = props;
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const trainer = useTrainerSelector();

    useEffect(() => {
        if (!trainer) {
            dispatch({
                type: ACTION_GET_TRAINER_REQUEST
            })
        }
    }, [])

    if(isMobile) {
        return <MobileSessions trainer={trainer} getSessions={getSessions} sessions={sessions} />;
    }

    return <DesktopSessions trainer={trainer} getSessions={getSessions} sessions={sessions} />;
};

export default Sessions;
