import React, {useEffect} from 'react';
import userTypes from "../../enums/user-types.enum";
import {useAuth} from "../../hooks/auth.hook";
import ClientSessions from "./sessions-client/sessions-client.component";
import TrainerSessions from "./sessions-trainer/sessions-trainer.component";
import {useDispatch} from "react-redux";
import {ACTION_GET_SESSIONS_REQUEST} from "../../store/action-types";

const Sessions = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: ACTION_GET_SESSIONS_REQUEST, payload:{page:1}});
    }, []);

    if(auth.type === userTypes.CLIENT) {
        return <ClientSessions />;
    }

    return <TrainerSessions />;
};

export default Sessions;
