import React from 'react';
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import AddSessionMobile from "../add-session/add-session-mobile/add-session-mobile.component";
import AddSessionDesktop from "../add-session/add-session-desktop/add-session-desktop.component";
import {SessionType} from "../../../../types/session.type";

type Props = {
    isOpen: boolean;
    session?: SessionType | null;
    onClose: () => void
};
const EditSession = ({isOpen,session, onClose}:Props) => {
    const isMobile = useIsMobile();
    return isMobile ? (
        <AddSessionMobile session={session} isOpen={isOpen} onClose={onClose} forEdit/>
    ) : (
        <AddSessionDesktop session={session} isOpen={isOpen} onClose={onClose} forEdit/>
    )
};

export default EditSession;
