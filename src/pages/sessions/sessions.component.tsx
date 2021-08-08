import React from 'react';
import userTypes from "../../enums/user-types.enum";
import {useAuth} from "../../hooks/auth.hook";
import ClientSessions from "./sessions-client/sessions-client.component";
import TrainerSessions from "./sessions-trainer/sessions-trainer.component";

const Sessions = () => {
    const auth = useAuth();

    if(auth.type === userTypes.CLIENT) {
        return <ClientSessions />;
    }

    return <TrainerSessions />;
};

export default Sessions;
